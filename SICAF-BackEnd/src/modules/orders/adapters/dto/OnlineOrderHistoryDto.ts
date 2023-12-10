import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type OnlineOrderHistoryDto = {
    id: number,
    client: string,
    payment_method: string,
    status: string,
    products_sold: number,
    subtotal: number,
    discount?: number,
    total: number,
    date: Date,
    products?: ReceiptProductsDto[]
}