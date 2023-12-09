import { OrderProductsDto } from "./OrderProductsDto"


export type OrderDto = {
    client_id: number,
    products: OrderProductsDto[]
}