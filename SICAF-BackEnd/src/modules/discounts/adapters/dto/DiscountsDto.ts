import { DiscountByCategoryDto } from "./DiscountByCategoryDto"
import { DiscountByProductDto } from "./DiscountByProductDto"
import { DiscountByProductQuantityDto } from "./DiscountByProductQuantityDto"
import { DiscountByRolDto } from "./DiscountByRolDto"
import { DiscountByTotalDto } from "./DiscountByTotalDto"

export type DiscountsDto = {
    discountsByRol: DiscountByRolDto[],
    discountsByOrderTotal: DiscountByTotalDto[],
    discountsByProductsNumber: DiscountByProductQuantityDto[],
    discountsByProduct: DiscountByProductDto[],
    discountsByCategory: DiscountByCategoryDto[]
}