import { ChangeStatusDto, FilterDto, GetHistoryDto, OnlineOrderHistoryDto, OrderDetailsDto, OrderHistoryDto, SaveOnlineOrderDto, SaveOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    findAllOrders(payload: FilterDto): Promise<OrderHistoryDto[]>;
    findAllOnlineOrders(payload: FilterDto): Promise<OnlineOrderHistoryDto[]>;
    getOrderHistoryByClient(payload: GetHistoryDto): Promise<OrderHistoryDto[]>;
    getOnlineOrderHistoryByClient(payload: GetHistoryDto): Promise<OnlineOrderHistoryDto[]>;
    findById(id: number): Promise<Order>;
    findOrderDetailsById(id: number): Promise<OrderDetailsDto[]>;
    saveOrder(order: SaveOrderDto): Promise<Order>;
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;
    changeOrderStatus(payload: ChangeStatusDto): Promise<Order>;
}