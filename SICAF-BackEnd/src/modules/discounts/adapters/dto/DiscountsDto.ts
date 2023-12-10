import { Discount } from "../../entities/discount"

export type DiscountsDto = {
    discountsByRol: Discount[],
    discountsByOrderTotal: Discount[],
    discountsByProductsNumber: Discount[],
    discountsByProduct: Discount[],
    discountsByCategory: Discount[]
}