import { GetOrderDetailsDto, OrderDetailsDto, SaveOnlineOrderDto, SaveOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    countOrdersByClient(payload: GetOrderDetailsDto): Promise<number>;
    findOrderDetailsByClient(payload: GetOrderDetailsDto): Promise<OrderDetailsDto[]>;
    saveOrder(order: SaveOrderDto): Promise<Order>;
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;  
}