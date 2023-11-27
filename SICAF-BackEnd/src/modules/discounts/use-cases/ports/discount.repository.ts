import { Discount } from "../../entities/discount";
import { SaveDiscountDto } from "../../adapters/dto/SaveDiscountDto";

export interface DiscountRepository {
    save(discount: SaveDiscountDto): Promise<Discount>
}