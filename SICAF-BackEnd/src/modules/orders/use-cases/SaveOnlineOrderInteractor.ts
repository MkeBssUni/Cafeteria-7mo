import { UseCase } from "../../../kernel/contracts";
import { OrderStatus, OrderTypes, PaymentMethods, Roles } from "../../../kernel/enums";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { Discount } from "../../discounts/entities/discount";
import { GetReceiptProductDto } from "../../products/adapters/dto/GetReceiptProductDto";
import { UserForOrderDto } from "../../users/adapters/dto/UserForOrderDto";
import { ReceiptDto, ReceiptProductsDto, SaveOnlineOrderDto } from "../adapters/dto";
import { findDiscountById, findProductById, findUserById, updateProductStock } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class SaveOnlineOrderInteractor implements UseCase<SaveOnlineOrderDto, Order> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: SaveOnlineOrderDto): Promise<Order> {
        let subtotal: number = 0;
        let discount: Discount | null = null;
        let order_products: ReceiptProductsDto[] = [];
        let products: GetReceiptProductDto[] = [];

        if (!payload.client_id || !payload.payment_method || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
        if (payload.payment_method !== PaymentMethods.creditCard && payload.payment_method !== PaymentMethods.debitCard) throw new Error("Invalid payment method");

        const client: UserForOrderDto = await findUserById(payload.client_id);
        if (!client) throw new Error("User not found");
        if (client.role !== Roles.client) throw new Error("Invalid role");

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

        //enviar email
        
        const order = {
            type: OrderTypes.online,
            client_id: payload.client_id,
            products_sold: receipt.products_sold,
            subtotal: receipt.subtotal,
            payment_method: payload.payment_method,
            discount_id: receipt.discount ? payload.discount_id : null,
            total: receipt.total,
            status: OrderStatus.pending,
            send_receipt: true,
            products: receipt.products
        } as SaveOnlineOrderDto;

        const orderSaved = await this.orderRepository.saveOnlineOrder(order);
        if (!orderSaved) throw new Error("Error saving order");

        for (let i = 0; i < products.length; i++) {
            const updateStock = await updateProductStock({ id: products[i].id!, stock: products[i].stock! - payload.products[i].quantity });
            if (!updateStock) throw new Error("Error updating stock");
        }

        return orderSaved;
    }
}