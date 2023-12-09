import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "./ports/discount.repository";

export class DiscountsByTypeInteractor implements UseCase<string, Discount[]> {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async execute(type: string): Promise<Discount[]> {
        if (!type) throw Error("Missing fields");
        if (type != DiscountTypes.discountByRol && type != DiscountTypes.discountByOrderTotal && type != DiscountTypes.discountByProductsTotal && type != DiscountTypes.discountByProduct && type != DiscountTypes.discountByCategory) throw Error("Invalid discount type");
        return await this.discountRepository.findByType(type);
    }
}