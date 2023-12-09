import { UseCase } from "../../../kernel/contracts";
import { OrderStatus, OrderTypes, PaymentMethods } from "../../../kernel/enums";
import { sendReceiptEmail } from "../../../kernel/functions";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { validateStringLength } from "../../../kernel/validations";
import { Discount } from "../../discounts/entities/discount";
import { GetProductWithCategoryDto } from "../../products/adapters/dto/get-product-dto";
import { UserByIdDto } from "../../users/adapters/dto/UserByIdDto";
import { ReceiptDto, ReceiptProductsDto, SaveOnlineOrderDto, SendReceiptDto } from "../adapters/dto";
import { findDiscountById, findProductById, findUserById, updateProductStock } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class SaveOnlineOrderInteractor implements UseCase<SaveOnlineOrderDto, Order> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: SaveOnlineOrderDto): Promise<Order> {
        if (!payload.client_id || !payload.payment_method || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
        if (payload.payment_method !== PaymentMethods.creditCard && payload.payment_method !== PaymentMethods.debitCard) throw new Error("Invalid payment method");
        if (payload.comments && !validateStringLength(payload.comments, 0, 255)) throw new Error("Invalid comment");
        
        /* const client: UserByIdDto = await findUserById(payload.client_id);
        if (!client) throw new Error("User not found");
        if (client.role_id !== 3) throw new Error("Invalid role"); */

        let subtotal: number = 0;
        let discount: Discount | null = null;
        let order_products: ReceiptProductsDto[] = [];
        let products: GetProductWithCategoryDto[] = [];

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

            const optionalProduct: GetProductWithCategoryDto = await findProductById(payload.products[i].id);
            if (!optionalProduct) throw new Error("Product not found");
            if (optionalProduct.stock < payload.products[i].quantity) throw new Error("Not enough stock");

            subtotal += optionalProduct.price * payload.products[i].quantity;

            products.push(optionalProduct);
            order_products.push({
                id: optionalProduct.id!,
                name: optionalProduct.name,
                category: optionalProduct.category.category_name,
                quantity: payload.products[i].quantity,
                price: optionalProduct.price,
                subtotal: optionalProduct.price * payload.products[i].quantity,
                discount: discount ? optionalProduct.discount_id : 0,
                total: optionalProduct.price * payload.products[i].quantity
            });
        }
        
        const receipt = generateReceipt(discount!, subtotal, order_products) as ReceiptDto;
        if (!receipt) throw new Error("Error generating receipt");

        /* const responseEmail = sendReceiptEmail({ email: '20213tn140@utez.edu.mx', receipt: {
            products_sold: receipt.products_sold,
            subtotal: receipt.subtotal,
            discount: receipt.discount ? receipt.discount : 0,
            total: receipt.total,
            products: receipt.products
        } as SendReceiptDto });
        if (!responseEmail) throw new Error("Error sending email"); */
        
        const order = {
            type: OrderTypes.online,
            client_id: payload.client_id,
            products_sold: receipt.products_sold,
            subtotal: receipt.subtotal,
            payment_method: payload.payment_method,
            discount_id: payload.discount_id,
            total: receipt.total,
            status: OrderStatus.pending,
            send_receipt: true,
            comments: payload.comments,
            products: receipt.products
        } as SaveOnlineOrderDto;

        const new_order = await this.orderRepository.saveOnlineOrder(order);
        if (!new_order) throw new Error("Error saving order");
        
        for (let i = 0; i < products.length; i++) {
            const updateStock = await updateProductStock({ id: products[i].id!, stock: products[i].stock - payload.products[i].quantity });
            if (!updateStock) throw new Error("Error updating stock");
        }

        return new_order;
    }
}