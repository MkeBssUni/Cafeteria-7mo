import { UseCase } from "../../../kernel/contracts";
import { ChangeStatusDto } from "../adapters/dto";
import { DiscountRepository } from "./ports/discount.repository";

export class ChangeStatusInteractor implements UseCase<ChangeStatusDto, boolean> {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async execute(payload: ChangeStatusDto): Promise<boolean> {
        if (!payload.id) throw new Error("Missing fields");
        const discount = await this.discountRepository.findById(payload.id);
        if (!discount) throw new Error("Discount not found");
        payload.status = !discount.status;
        return await this.discountRepository.changeStatus(payload);
    }
}