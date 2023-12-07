import { ProductInCartDto } from "../adapters/dto/products-in-cart-dto"

export type ShoppingCart={
    user_id:number,
    cart:{
        product:ProductInCartDto[],
        pre_total_cart: number,
    }
}