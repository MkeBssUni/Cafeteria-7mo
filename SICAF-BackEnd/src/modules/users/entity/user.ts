import { Entity } from "../../../kernel/types";
import { ShoppingCart } from "./shopping-cart";

export type User = {
    user_id?: number,
    email: string,
    password?: string,
    role_id: number,
    dark_theme?: boolean,
    letter_size?: number,
    reset_token?: string,
    status?: boolean,
    created_at?: Date,
    person:{
        person_id?: number,
        user_id?: number,
        name: string,
        lastname: string,
        gender: 'M' | 'F' | 'O',
        birthday?: Date,
        phone_number1: string,
        phone_number2?: string,
        shopping_cart?:ShoppingCart,
        created_at?: Date,
        address:{
            id?: number,
            street: String,
            settlement: String,
            external_number?: String,
            internal_number?: String,
            city: String,
            state: String,
            postal_code: String,
            country: String,
            created_at?: Date,
        }
    }
}