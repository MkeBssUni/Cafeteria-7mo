import { Discount } from "../../entities/discount";
import { SaveDiscountDto, UpdateDiscountDto, ChangeStatusDto } from "../../adapters/dto";

export interface DiscountRepository {
    findById(id: number): Promise<Discount>
    findByOrderTotal(order_total: number): Promise<Discount[]>
    findByRole(id: number): Promise<Discount[]>
    save(discount: SaveDiscountDto): Promise<Discount>
    update(discount: UpdateDiscountDto): Promise<Discount>
    changeStatus(payload: ChangeStatusDto): Promise<boolean>
}