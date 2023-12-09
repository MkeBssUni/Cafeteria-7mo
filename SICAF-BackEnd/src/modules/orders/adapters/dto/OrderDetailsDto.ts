import { Order } from "../../entities/order"
import { OrderDetails } from "../../entities/orderDetails"

export type OrderDetailsDto = {
    order: Order,
    order_details: OrderDetails[]
}