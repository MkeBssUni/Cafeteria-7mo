import { OrderProductsDto } from "./OrderProductsDto";

export type GetReceiptDto = {
    client_id: number,
    discount_id?: number,
    products: OrderProductsDto[];
}