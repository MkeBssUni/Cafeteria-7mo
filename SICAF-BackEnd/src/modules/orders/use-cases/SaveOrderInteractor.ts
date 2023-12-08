import { UseCase } from "../../../kernel/contracts";
import { OrderStatus, OrderTypes, PaymentMethods } from "../../../kernel/enums";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { validateStringLength } from "../../../kernel/validations";
import { Discount } from "../../discounts/entities/discount";
import { Product } from "../../products/entities/product";
import { ReceiptDto, ReceiptProductsDto, SaveOrderDto } from "../adapters/dto";
import { existsUserByIdAndRole, findDiscountById, findProductById, updateProductStock } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class SaveOrderInteractor implements UseCase<SaveOrderDto, Order> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: SaveOrderDto): Promise<Order> {
        if (!payload.employee_id || !payload.payment_method || !payload.products.length) throw new Error("Missing fields");
        if (payload.send_receipt && !payload.client_id) throw new Error("Missing fields");
        if (isNaN(payload.employee_id)) throw new Error("Invalid id");
        if (payload.payment_method !== PaymentMethods.creditCard && payload.payment_method !== PaymentMethods.debitCard && payload.payment_method !== PaymentMethods.cash) throw new Error("Invalid payment method");
        if (payload.comments && !validateStringLength(payload.comments, 0, 255)) throw new Error("Invalid comment");

        const employee = await existsUserByIdAndRole({ id: payload.employee_id, role: 2 });
        if (!employee) throw new Error("User not found");
        const client = payload.client_id ? await existsUserByIdAndRole({ id: payload.client_id, role: 3 }) : null;
        if (payload.client_id && !client) throw new Error("User not found");
        
        let subtotal: number = 0;
        let discount: Discount | null = null;
        let order_products: ReceiptProductsDto[] = [];
        let products: Product[] = [];

        if (payload.discount_id) {
            if (isNaN(payload.discount_id)) throw new Error("Invalid id");
            const optionalDiscount: Discount = await findDiscountById(payload.discount_id);
            if (!optionalDiscount) throw new Error("Discount not found");
            discount = optionalDiscount;
        }

        for (let i = 0; i < payload.products.length; i++) {
            if (!payload.products[i].id || !payload.products[i].quantity) throw new Error("Missing fields");
            if (isNaN(payload.products[i].id)) throw new Error("Invalid id");
            if (isNaN(payload.products[i].quantity) || payload.products[i].quantity < 0) throw new Error("Invalid quantity");

            const optionalProduct: Product = await findProductById(payload.products[i].id);
            if (!optionalProduct) throw new Error("Product not found");
            if (optionalProduct.stock < payload.products[i].quantity) throw new Error("Not enough stock");

            subtotal += optionalProduct.price * payload.products[i].quantity;
            
            products.push(optionalProduct);
            order_products.push({
                id: optionalProduct.id!,
                name: optionalProduct.name,
                quantity: payload.products[i].quantity,
                price: optionalProduct.price,
                subtotal: optionalProduct.price * payload.products[i].quantity,
                discount: discount ? optionalProduct.discount_id : 0,
                total: optionalProduct.price * payload.products[i].quantity
            });
        }

        const receipt = generateReceipt(discount!, subtotal, order_products) as ReceiptDto;
        if (!receipt) throw new Error("Error generating receipt");

        if (payload.send_receipt) {
            //enviar correo
        } else {
            payload.send_receipt = false;
        }

        const order = {
            type: OrderTypes.presential,
            employee_id: payload.employee_id,
            client_id: payload.client_id,
            products_sold: receipt.products_sold,
            subtotal: receipt.subtotal,
            payment_method: payload.payment_method,
            discount_id: payload.discount_id,
            total: receipt.total,
            status: OrderStatus.completed,
            send_receipt: payload.send_receipt,
            comments: payload.comments,
            products: receipt.products
        } as SaveOrderDto;

        const new_order = await this.orderRepository.saveOrder(order);
        if (!new_order) throw new Error("Error saving order");
        
        for (let i = 0; i < payload.products.length; i++) {
            const updateStock = await updateProductStock({ id: products[i].id!, stock: products[i].stock - payload.products[i].quantity });
            if (!updateStock) throw new Error("Error updating stock");
        }

        return new_order;
    }
}