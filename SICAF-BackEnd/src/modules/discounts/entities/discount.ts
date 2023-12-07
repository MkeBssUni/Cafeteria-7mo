import { Entity } from "../../../kernel/types";

export type Discount = Entity<number> & {
    type: string,
    description: string,
    percentage: number,
    start_date?: Date,
    end_date?: Date,
    order_total?: number,
    products_number?: number,
    status: boolean,
    image?: string,
    created_by: Date
}