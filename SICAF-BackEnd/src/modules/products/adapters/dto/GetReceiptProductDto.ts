export type GetReceiptProductDto = {
    id: number,
    category: string,
    name: string,
    price: number,
    discount?: number,
    stock: number
    status: boolean
}