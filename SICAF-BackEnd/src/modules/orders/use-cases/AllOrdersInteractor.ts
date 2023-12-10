import moment from 'moment';
import { UseCase } from "../../../kernel/contracts";
import { FilterDto, OrderHistoryDto } from "../adapters/dto";
import { OrderRepository } from "./ports/order.repository";

export class AllOrdersInteractor implements UseCase<FilterDto, OrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: FilterDto): Promise<OrderHistoryDto[]> {
        const today = moment().toDate();

        if (!payload.filter) throw new Error('Missing fields');
        if (payload.filter !== 'day' && payload.filter !== 'month' && payload.filter !== 'year' && payload.filter !== 'default') throw new Error('Invalid filter');
        if (payload.filter !== 'default' && !payload.value) throw new Error('Missing fields');

        switch (payload.filter) {
            case 'day':
                if (!/^\d{4}-\d{2}-\d{2}$/.test(payload.value!)) throw new Error('Invalid date format');
                const date = moment(payload.value, 'YYYY-MM-DD').toDate();
                if (date.toString() === 'Invalid Date') throw new Error('Invalid date');
                if (date > today) throw new Error('Invalid date');
                break;
            case 'month':
                if (!/^\d{4}-\d{2}$/.test(payload.value!)) throw new Error('Invalid date format');
                const month = moment(payload.value, 'YYYY-MM').toDate();
                if (month.toString() === 'Invalid Date') throw new Error('Invalid date');
                if (month > today) throw new Error('Invalid date');
                break;
            case 'year':
                if (!/^\d{4}$/.test(payload.value!)) throw new Error('Invalid date format');
                const year = moment(payload.value, 'YYYY').toDate();
                if (year.toString() === 'Invalid Date') throw new Error('Invalid date');
                if (year > today) throw new Error('Invalid date');
                break;
            default:
                break;
        }

        return await this.orderRepository.findAllOrders(payload);
    }
}