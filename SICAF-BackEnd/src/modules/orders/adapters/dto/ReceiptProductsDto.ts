export type ReceiptProductsDto = {
    id: number,
    name: string,
    quantity: number,
    price: number,
    subtotal: number,
    discount?: number,
    total: number
}