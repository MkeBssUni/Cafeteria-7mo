import { SaveOnlineOrderDto, SaveOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    saveOrder(order: SaveOrderDto): Promise<Order>;
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;   
}