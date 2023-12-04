import { SaveOnlineOrderDto } from "../../adapters/dto";
import { Order } from "../../entities/order";

export interface OrderRepository {
    saveOnlineOrder(order: SaveOnlineOrderDto): Promise<Order>;    
}