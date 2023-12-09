import { UseCase } from "../../../kernel/contracts";
import { OrderStatus, OrderTypes, PaymentMethods } from "../../../kernel/enums";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { validateStringLength } from "../../../kernel/validations";
import { Discount } from "../../discounts/entities/discount";
import { GetReceiptProductDto } from "../../products/adapters/dto/GetReceiptProductDto";
import { ReceiptDto, ReceiptProductsDto, SaveOnlineOrderDto } from "../adapters/dto";
import { findDiscountById, findProductById, updateProductStock } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class SaveOnlineOrderInteractor implements UseCase<SaveOnlineOrderDto, Order> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: SaveOnlineOrderDto): Promise<Order> {
        if (!payload.client_id || !payload.payment_method || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
        if (payload.payment_method !== PaymentMethods.creditCard && payload.payment_method !== PaymentMethods.debitCard) throw new Error("Invalid payment method");

        //validar que el cliente exista y que tenga el rol de cliente

        let subtotal: number = 0;
        let discount: Discount | null = null;
        let order_products: ReceiptProductsDto[] = [];
        let products: GetReceiptProductDto[] = [];

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
            if (optionalProduct.stock! < payload.products[i].quantity) throw new Error("Not enough stock");

            subtotal += optionalProduct.price * payload.products[i].quantity;
            
            //validar que los productos estén habilitados
            //validar stock

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

        //reducir stock

        return await this.orderRepository.saveOnlineOrder(order);
    }
}