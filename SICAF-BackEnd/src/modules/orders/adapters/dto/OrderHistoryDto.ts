import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type OrderHistoryDto = {
    id: number,
    employee: string,
    client: string,
    payment_method: string,
    status: string,
    products_sold: number,
    subtotal: number,
    discount?: number,
    total: number,
    send_receipt: boolean,
    comments?: string,
    date: Date,
    products?: ReceiptProductsDto[]
}