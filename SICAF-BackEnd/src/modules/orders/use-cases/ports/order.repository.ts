import { OnlineOrderHistoryDto, OrderHistoryDto, SaveOnlineOrderDto, SaveOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    getOrderHistoryByClient(client: number): Promise<OrderHistoryDto[]>;
    getOnlineOrderHistoryByClient(client: number): Promise<OnlineOrderHistoryDto[]>;
    saveOrder(order: SaveOrderDto): Promise<Order>;
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;
}