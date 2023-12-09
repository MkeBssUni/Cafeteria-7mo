import { Entity } from "../../../kernel/types";

export type OrderDetails = Entity<number> & {
    order_id: number,
    product_id: number,
    products_sold: number,
    discount_id?: number,
    subtotal: number,
    total: number,
    created_at: Date
}