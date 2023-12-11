export type DiscountByRolDto = {
    id: number,
    type: string,
    description: string,
    percentage: number,
    status: boolean,
    rol: {
        id: number,
        name: string
    }
    created_by: Date
}