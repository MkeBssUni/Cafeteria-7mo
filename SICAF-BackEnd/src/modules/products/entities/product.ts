import { Entity } from "../../../kernel/types";

export type Product = Entity<number> & {
    name: string,
    description: string,
    status: boolean,
    image: string,
    price: number,
    stock: number,
    category_id: number,
    discount_id?: number,
    provider_id?: number,
}