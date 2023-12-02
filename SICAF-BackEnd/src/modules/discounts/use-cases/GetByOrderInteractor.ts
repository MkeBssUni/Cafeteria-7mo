import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { Product } from "../../products/entities/product";
import { OrderDto } from "../adapters/dto";
import { findProductById } from "../boundary";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "./ports/discount.repository";

export class GetByOrderInteractor implements UseCase<OrderDto, Discount[]> {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async execute(payload: OrderDto): Promise<Discount[]> {

        let amount: number = 0;
        let products_sold: number = 0;
        let discounts: Discount[] = [];
        let discountsByTotal: Discount[] = [];

        if (!payload.client_id || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");

        //verificar que el cliente exista
        //verificar si el cliente tiene descuento por rol y asinarlo a discountByRole

        for (let i = 0; i < payload.products.length; i++) {
            if (!payload.products[i].id || !payload.products[i].quantity) throw new Error("Missing fields");
            if (isNaN(payload.products[i].id)) throw new Error("Invalid id");
            if (isNaN(payload.products[i].quantity) || payload.products[i].quantity < 0) throw new Error("Invalid quantity");

            const product: Product = await findProductById(payload.products[i].id);
            if (!product) throw new Error("Product not found");
            amount += Number(product.price * payload.products[i].quantity);
            products_sold += payload.products[i].quantity;

            if (product.discount_id) {
                const discount: Discount = await this.discountRepository.findById(product.discount_id);
                if (discount.type === DiscountTypes.discountByProductsTotal) {
                    if (payload.products[i].quantity === discount.products_number!) discounts.push(discount);
                } else {
                    discounts.push(discount);
                }       
            }
        }

        discountsByTotal = await this.discountRepository.findByOrderTotal(amount);

        return [...discountsByTotal, ...discounts];
    }
}