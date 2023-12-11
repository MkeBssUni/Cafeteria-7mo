export type DiscountEmailDto = {
    type: string,
    percentage?: number,
    description: string,
    start_date?: Date,
    end_date?: Date,
    rol?: string,
    amount?: number,
    category?: string,
    quantity?: number,
    products?: [
        {
            name: string,
            price: number
        }
    ],
}