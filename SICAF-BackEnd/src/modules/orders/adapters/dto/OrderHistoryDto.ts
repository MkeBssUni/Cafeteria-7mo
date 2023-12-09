import { ReceiptDto } from "./ReceiptDto"

export type OrderHistoryDto = {
    id: number,
    employee: string,
    payment_method: string,
    status: string,
    details: ReceiptDto,
    send_receipt: boolean,
    comments?: string,
    date: Date
}