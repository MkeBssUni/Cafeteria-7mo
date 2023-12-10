import { UseCase } from "../../../kernel/contracts";
import { FilterDto, OrderHistoryDto } from "../adapters/dto";
import { OrderRepository } from "./ports/order.repository";
import { validateFilter } from '../../../kernel/validations';

export class AllOrdersInteractor implements UseCase<FilterDto, OrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: FilterDto): Promise<OrderHistoryDto[]> {
        if (!payload.filter) throw new Error('Missing fields');
        if (payload.filter !== 'day' && payload.filter !== 'month' && payload.filter !== 'year' && payload.filter !== 'default') throw new Error('Invalid filter');
        if (payload.filter !== 'default' && !payload.value) throw new Error('Missing fields');
        if (!validateFilter(payload)) throw new Error('Invalid date');

        return await this.orderRepository.findAllOrders(payload);
    }
}