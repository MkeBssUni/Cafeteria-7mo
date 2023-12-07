import { ShoppingCart } from "../../../users/entity/shopping-cart"

export type GetUserDto = {
    id: number,
    name: string,
    lastname: string,
    email: string,
    password?: string,
    role: string,
    dark_theme: boolean,
    letter_size: number,
    status: boolean,
    shopping_cart?: ShoppingCart
}