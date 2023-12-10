import { UseCase } from "../../../kernel/contracts";
import { OnlineOrderHistoryDto } from "../adapters/dto";
import { existsUserById } from "../boundary";
import { OrderRepository } from "./ports/order.repository";

export class OnlineOrderHistoryInteractor implements UseCase<number, OnlineOrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(client: number): Promise<OnlineOrderHistoryDto[]> {
        if (!client) throw new Error('Missing fields');
        if (!await existsUserById(client)) throw new Error('User not found');
        
        const orders: OnlineOrderHistoryDto[] = await this.orderRepository.getOnlineOrderHistoryByClient(client);

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