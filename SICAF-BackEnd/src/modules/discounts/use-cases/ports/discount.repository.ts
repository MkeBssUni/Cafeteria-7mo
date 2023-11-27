import { Discount } from "../../entities/discount";
import { SaveDiscountDto, UpdateDiscountDto } from "../../adapters/dto";

export interface DiscountRepository {
    findById(id: number): Promise<Discount>
    save(discount: SaveDiscountDto): Promise<Discount>
    update(discount: UpdateDiscountDto): Promise<Discount>
}