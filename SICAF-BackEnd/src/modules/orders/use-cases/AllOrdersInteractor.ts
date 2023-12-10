import { UseCase } from "../../../kernel/contracts";
import { OrderHistoryDto } from "../adapters/dto";
import { OrderRepository } from "./ports/order.repository";

export class AllOrdersInteractor implements UseCase<null, OrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(): Promise<OrderHistoryDto[]> {
        return await this.orderRepository.findAllOrders();
    }
}