export type DiscountByProductDto = {
    id: number,
    type: string,
    description: string,
    percentage: number,
    start_date?: Date,
    end_date?: Date,
    products: {
        id: number,
        name: string
    }[],
    status: boolean,
    image?: string,
    created_by: Date
}