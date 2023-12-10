import { FilterDto, GetHistoryDto, OnlineOrderHistoryDto, OrderHistoryDto, SaveOnlineOrderDto, SaveOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    findAllOrders(payload: FilterDto): Promise<OrderHistoryDto[]>;
    findAllOnlineOrders(payload: FilterDto): Promise<OnlineOrderHistoryDto[]>;
    getOrderHistoryByClient(payload: GetHistoryDto): Promise<OrderHistoryDto[]>;
    getOnlineOrderHistoryByClient(payload: GetHistoryDto): Promise<OnlineOrderHistoryDto[]>;
    saveOrder(order: SaveOrderDto): Promise<Order>;
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;
}