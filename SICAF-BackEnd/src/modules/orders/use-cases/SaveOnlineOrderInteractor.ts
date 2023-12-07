import { UseCase } from "../../../kernel/contracts";
import { PaymentMethods } from "../../../kernel/enums";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { validateStringLength } from "../../../kernel/validations";
import { Discount } from "../../discounts/entities/discount";
import { Product } from "../../products/entities/product";
import { ReceiptDto, ReceiptProductsDto, SaveOnlineOrderDto } from "../adapters/dto";
import { findDiscountById, findProductById } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class SaveOnlineOrderInteractor implements UseCase<SaveOnlineOrderDto, Order> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: SaveOnlineOrderDto): Promise<Order> {
        if (!payload.client_id || !payload.payment_method || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
        if (payload.payment_method !== PaymentMethods.creditCard && payload.payment_method !== PaymentMethods.debitCard) throw new Error("Invalid payment method");
        if (payload.comments && !validateStringLength(payload.comments, 0, 255)) throw new Error("Invalid comment");
        
        let subtotal: number = 0;
        let discount: Discount | null = null;
        let products: ReceiptProductsDto[] = [];

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

            subtotal += optionalProduct.price * payload.products[i].quantity;

            products.push({
                id: optionalProduct.id!,
                name: optionalProduct.name,
                quantity: payload.products[i].quantity,
                price: optionalProduct.price,
                subtotal: optionalProduct.price * payload.products[i].quantity,
                discount: discount ? optionalProduct.discount_id : 0,
                total: optionalProduct.price * payload.products[i].quantity
            });
        }
        
        const receipt = generateReceipt(discount!, subtotal, products) as ReceiptDto;
        if (!receipt) throw new Error("Error generating receipt");

        //enviar correo
        payload.send_receipt = payload.send_receipt || false;
        
        const order = {
            type: "En linea",
            client_id: payload.client_id,
            products_sold: receipt.products_sold,
            subtotal: receipt.subtotal,
            payment_method: payload.payment_method,
            discount_id: payload.discount_id,
            total: receipt.total,
            status: "Pendiente",
            send_receipt: payload.send_receipt,
            comments: payload.comments,
            products: receipt.products
        } as SaveOnlineOrderDto;
        
        return await this.orderRepository.saveOnlineOrder(order);
    }
}