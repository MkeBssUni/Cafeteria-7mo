import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type ReceiptDto = {
    subtotal: number,
    discount?: number,
    total: number,
    products: ReceiptProductsDto[]
}