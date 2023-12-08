export type ReceiptProductsDto = {
    id: number,
    category?: string,
    name?: string,
    quantity: number,
    price?: number,
    subtotal?: number,
    discount?: number,
    total?: number
}