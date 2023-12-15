export type DiscountByTotalDto = {
    id: number,
    type: string,
    description: string,
    percentage: number,
    start_date?: Date,
    end_date?: Date,
    order_total: number,
    status: boolean,
    image?: string,
    created_by: Date
}