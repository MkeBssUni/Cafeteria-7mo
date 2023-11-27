export type SaveDiscountDto = {
    type: string,
    description: string,
    percentage: number,
    start_date?: Date,
    end_date?: Date,
    order_total?: number,
    products_number?: number,
    image?: string,
    rol_id?: number,
    category_id?: number,
    products_id?: number[]
}