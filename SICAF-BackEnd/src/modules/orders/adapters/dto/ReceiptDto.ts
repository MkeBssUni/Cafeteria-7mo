import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type ReceiptDto = {
    subtotal: number,
    total: number,
    products_sold: number,
    products: ReceiptProductsDto[],    
    discount?: number
}