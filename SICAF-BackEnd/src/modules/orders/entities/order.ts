import { Entity } from "../../../kernel/types";

export type Order = Entity<number> & {
    type: string,
    employee_id?: number,
    client_id: number,
    products_sold: number,
    subtotal: number,
    payment_method: string,
    discount_id?: number,
    total: number,
    status: string,
    send_receipt: boolean,
    comments?: string,
    created_at: Date
}