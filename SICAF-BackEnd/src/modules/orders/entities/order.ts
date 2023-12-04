import { Entity } from "../../../kernel/types";

export type Order = Entity<number> & {
    type: string,
    employee_id?: number,
    client_id: number,
    products_sold: number,
    amount: number,
    payment_method: string,
    discount_id?: number,
    final_amount: number,
    status: string,
    send_receipt: boolean,
    comments?: string,
    created_at: Date
}