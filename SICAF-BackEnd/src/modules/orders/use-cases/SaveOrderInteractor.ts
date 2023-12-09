import { UseCase } from "../../../kernel/contracts";
import { OrderStatus, OrderTypes, PaymentMethods, Roles } from "../../../kernel/enums";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { validateStringLength } from "../../../kernel/validations";
import { Discount } from "../../discounts/entities/discount";
import { GetReceiptProductDto } from "../../products/adapters/dto/GetReceiptProductDto";
import { UserByIdDto } from "../../users/adapters/dto/UserByIdDto";
import { ReceiptDto, ReceiptProductsDto, SaveOrderDto } from "../adapters/dto";
import { findDiscountById, findProductById, findUserById, updateProductStock } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class SaveOrderInteractor implements UseCase<SaveOrderDto, Order> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: SaveOrderDto): Promise<Order> {
        let subtotal: number = 0;
        let discount: Discount | null = null;
        let order_products: ReceiptProductsDto[] = [];
        let products: GetReceiptProductDto[] = [];
        
        if (!payload.employee_id || !payload.payment_method || !payload.products.length) throw new Error("Missing fields");
        if (payload.send_receipt && !payload.client_id) throw new Error("Missing fields");
        if (isNaN(payload.employee_id)) throw new Error("Invalid id");
        if (payload.payment_method !== PaymentMethods.creditCard && payload.payment_method !== PaymentMethods.debitCard && payload.payment_method !== PaymentMethods.cash) throw new Error("Invalid payment method");
        if (payload.comments && !validateStringLength(payload.comments, 0, 255)) throw new Error("Invalid comment");

        const employee: UserByIdDto = await findUserById(payload.employee_id);
        if (!employee) throw new Error("User not found");
        if (employee.role !== Roles.employee) throw new Error("Invalid role");
        const client = payload.client_id ? await findUserById(payload.client_id) as UserByIdDto : null;
        if (payload.client_id && !client) throw new Error("User not found");
        if (payload.client_id && !(payload.client_id !== payload.employee_id)) throw new Error("Invalid users");

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

            const optionalProduct: GetReceiptProductDto = await findProductById(payload.products[i].id);
            if (!optionalProduct) throw new Error("Product not found");
            if (!optionalProduct.status) throw new Error("Product disabled");
            if (optionalProduct.stock! < payload.products[i].quantity) throw new Error("Not enough stock");

            subtotal += optionalProduct.price * payload.products[i].quantity;
            
            products.push(optionalProduct);

            order_products.push({
                id: optionalProduct.id!,
                name: optionalProduct.name,
                category: optionalProduct.category,
                quantity: payload.products[i].quantity,
                price: optionalProduct.price,
                subtotal: optionalProduct.price * payload.products[i].quantity,
                discount: discount ? optionalProduct.discount : 0,
                total: optionalProduct.price * payload.products[i].quantity
            });
        }

        const receipt = generateReceipt(discount!, subtotal, order_products) as ReceiptDto;
        if (!receipt) throw new Error("Error generating receipt");

        //enviar correo

        const order = {
            type: OrderTypes.presential,
            employee_id: payload.employee_id,
            client_id: payload.client_id,
            products_sold: receipt.products_sold,
            subtotal: receipt.subtotal,
            payment_method: payload.payment_method,
            discount_id: receipt.discount ? payload.discount_id : null,
            total: receipt.total,
            status: OrderStatus.completed,
            send_receipt: payload.send_receipt,
            comments: payload.comments,
            products: receipt.products
        } as SaveOrderDto;

        const orderSaved = await this.orderRepository.saveOrder(order);
        if (!orderSaved) throw new Error("Error saving order");

        for (let i = 0; i < products.length; i++) {
            const updateStock = await updateProductStock({ id: products[i].id!, stock: products[i].stock! - payload.products[i].quantity });
            if (!updateStock) throw new Error("Error updating stock");
        }

        return orderSaved;
    }
}