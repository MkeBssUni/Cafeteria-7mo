import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { DiscountsDto } from "../adapters/dto";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "./ports/discount.repository";

export class ActiveDiscountsInteractor implements UseCase<null, DiscountsDto> {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async execute(): Promise<DiscountsDto> {
        let discountsByRol: Discount[] = [];
        let discountsByOrderTotal: Discount[] = [];
        let discountsByProductsNumber: Discount[] = [];
        let discountsByProduct: Discount[] = [];
        let discountsByCategory: Discount[] = [];

        const activeDiscounts = await this.discountRepository.findAllActive();

        for (let discount of activeDiscounts) {
            switch(discount.type) {
                case DiscountTypes.discountByRol:
                    discountsByRol.push(discount);
                    break;
                case DiscountTypes.discountByOrderTotal:
                    discountsByOrderTotal.push(discount);
                    break;
                case DiscountTypes.discountByProductsTotal:
                    discountsByProductsNumber.push(discount);
                    break;
                case DiscountTypes.discountByProduct:
                    discountsByProduct.push(discount);
                    break;
                case DiscountTypes.discountByCategory:
                    discountsByCategory.push(discount);
                    break;
                default:
                    break;
            }
        }

        return {
            discountsByRol,
            discountsByOrderTotal,
            discountsByProductsNumber,
            discountsByProduct,
            discountsByCategory
        };
    }
}