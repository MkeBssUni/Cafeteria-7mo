import { UseCase } from "../../../kernel/contracts";
import { validateFilter } from "../../../kernel/validations";
import { FilterDto, GetHistoryDto, OrderHistoryDto } from "../adapters/dto";
import { existsUserById } from "../boundary";
import { OrderRepository } from "./ports/order.repository";

export class OrderHistoryInteractor implements UseCase<GetHistoryDto, OrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: GetHistoryDto): Promise<OrderHistoryDto[]> {
        if (!payload.client) throw new Error('Missing fields');
        if (isNaN(payload.client)) throw new Error('Invalid id');
        if (!await existsUserById(payload.client)) throw new Error('User not found');
        if (!payload.filter.filter) throw new Error('Missing fields');
        if (payload.filter.filter !== 'day' && payload.filter.filter !== 'month' && payload.filter.filter !== 'year' && payload.filter.filter !== 'default') throw new Error('Invalid filter');
        if (payload.filter.filter !== 'default' && !payload.filter.value) throw new Error('Missing fields');
        if (!validateFilter(payload.filter)) throw new Error('Invalid date');
        
        const orders: OrderHistoryDto[] = await this.orderRepository.getOrderHistoryByClient(payload);

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