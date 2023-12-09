import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type SendReceiptDto = {
    products_sold: number,
    subtotal: number,
    discount: number,
    total: number,
    products: ReceiptProductsDto[]
}