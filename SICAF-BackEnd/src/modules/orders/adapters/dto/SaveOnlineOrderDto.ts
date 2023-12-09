import { ReceiptProductsDto } from "./ReceiptProductsDto"

export type SaveOnlineOrderDto = {
    type: string,
    client_id: number,
    products_sold?: number,
    subtotal?: number,
    payment_method: string,
    discount_id?: number,
    total?: number,
    status: string,
    send_receipt: boolean,
    products: ReceiptProductsDto[]
}