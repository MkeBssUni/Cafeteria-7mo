import { UpdateDiscountDto } from "../../adapters/dto/UpdateDiscountDto";
import { Role } from "../../entities/role";

export interface RoleRepository {
    findAll(): Promise<Role[]>;
    findById(id: number): Promise<Role>;
    findByDiscount(discount: number): Promise<Role>;
    updateDiscount(payload: UpdateDiscountDto): Promise<Role>;
}
