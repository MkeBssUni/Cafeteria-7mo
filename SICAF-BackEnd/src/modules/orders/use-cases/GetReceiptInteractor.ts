import { UseCase } from "../../../kernel/contracts";
import { Roles } from "../../../kernel/enums";
import { generateReceipt } from "../../../kernel/generate_receipt";
import { Discount } from "../../discounts/entities/discount";
import { GetReceiptProductDto } from "../../products/adapters/dto/GetReceiptProductDto";
import { UserByIdDto } from "../../users/adapters/dto/UserByIdDto";
import { GetReceiptDto, ReceiptDto, ReceiptProductsDto } from "../adapters/dto";
import { findDiscountById, findProductById, findUserById } from "../boundary";

export class GetReceiptInteractor implements UseCase<GetReceiptDto, ReceiptDto> {
    constructor() {}

    async execute(payload: GetReceiptDto): Promise<ReceiptDto> {
        let subtotal: number = 0;
        let discount: Discount | null = null;
        let products: ReceiptProductsDto[] = [];

        if (!payload.client_id || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
    
        const client: UserByIdDto = await findUserById(payload.client_id);
        if (!client) throw new Error("User not found");
        
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

            products.push({
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
        
        const receipt = generateReceipt(discount!, subtotal, products) as ReceiptDto;
        return receipt;
    }
}