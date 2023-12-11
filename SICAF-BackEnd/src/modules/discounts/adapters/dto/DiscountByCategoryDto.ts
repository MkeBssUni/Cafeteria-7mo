export type DiscountByCategoryDto = {
    id: number,
    type: string,
    description: string,
    percentage: number,
    start_date?: Date,
    end_date?: Date,
    category: {
        id: number,
        name: string
    },
    status: boolean,
    image?: string,
    created_by: Date
}