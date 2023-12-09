import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type ReceiptDto = {
    products_sold: number,
    subtotal: number,
    discount?: number
    total: number,
    products: ReceiptProductsDto[]
}