import { UseCase } from "../../../kernel/contracts";
import { OrderHistoryDto } from "../adapters/dto";
import { existsUserById } from "../boundary";
import { OrderRepository } from "./ports/order.repository";

export class OrderHistoryInteractor implements UseCase<number, OrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(client: number): Promise<OrderHistoryDto[]> {
        if (!client) throw new Error('Missing fields');
        if (!await existsUserById(client)) throw new Error('User not found');
        
        const orders: OrderHistoryDto[] = await this.orderRepository.getOrderHistoryByClient(client);

        for (let i = 0; i < orders.length; i++) {
            (orders[i].total != orders[i].subtotal) ? (orders[i].discount = orders[i].subtotal - orders[i].total) : orders[i].discount = 0;
            for (let j = 0; j < orders[i].products!.length; j++) {
                orders[i].products![j].price = orders[i].products![j].subtotal! / orders[i].products![j].quantity;
                (orders[i].products![j].total != orders[i].products![j].subtotal) ? (orders[i].products![j].discount = orders[i].products![j].subtotal! - orders[i].products![j].total!) : orders[i].products![j].discount = 0;
            }
        }

        return orders;
    }
}