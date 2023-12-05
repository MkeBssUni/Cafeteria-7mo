export type CreateProductDto = {
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number,
    category_id: number,
    discount_id?: number,
    provider_id?: number,
}