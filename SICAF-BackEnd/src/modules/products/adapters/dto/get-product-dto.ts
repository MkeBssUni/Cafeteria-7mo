export type GetProductWithCategoryDto = {
    id: number,
    name: string,
    description: string,
    status: boolean,
    image: string,
    price: number,
    stock: number,
    category:{
        category_id: number,
        category_name: string,
    }
    discount_id?: number,
    provider_id?: number,
    created_at?: Date,
}