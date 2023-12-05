import { UseCase } from "../../../kernel/contracts";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { Discount } from "../../discounts/entities/discount";
import { Product } from "../../products/entities/product";
import { GetReceiptDto, ReceiptDto, ReceiptProductsDto } from "../adapters/dto";
import { findDiscountById, findProductById } from "../boundary";
import { OrderRepository } from "./ports/order.repository";

export class GetReceiptInteractor implements UseCase<GetReceiptDto, ReceiptDto> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: GetReceiptDto): Promise<ReceiptDto> {
        if (!payload.client_id || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
        //validar que el cliente exista

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
        return receipt;
    }
}