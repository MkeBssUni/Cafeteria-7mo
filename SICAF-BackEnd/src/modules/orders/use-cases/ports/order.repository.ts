import { OrderHistoryDto, SaveOnlineOrderDto, SaveOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    getOrderHistoryByClient(client: number): Promise<OrderHistoryDto[]>;
    saveOrder(order: SaveOrderDto): Promise<Order>;
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;
}