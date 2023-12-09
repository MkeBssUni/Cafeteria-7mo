import { UseCase } from "../../../kernel/contracts";
import { OrderHistoryDto } from "../adapters/dto";

export class OrderHistoryInteractor implements UseCase<number, OrderHistoryDto[]> {
    constructor() {}
    execute(payload: number): Promise<OrderHistoryDto[]> {
        throw new Error("Method not implemented.");
    }
}