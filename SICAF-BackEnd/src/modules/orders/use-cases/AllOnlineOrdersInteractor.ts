import { UseCase } from "../../../kernel/contracts";
import { OnlineOrderHistoryDto } from "../adapters/dto";
import { OrderRepository } from "./ports/order.repository";

export class AllOnlineOrdersInteractor implements UseCase<null, OnlineOrderHistoryDto[]> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(): Promise<OnlineOrderHistoryDto[]> {
        return await this.orderRepository.findAllOnlineOrders();
    }
}