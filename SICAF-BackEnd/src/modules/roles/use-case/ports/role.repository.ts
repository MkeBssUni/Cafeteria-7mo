import { UpdateDiscountDto } from "../../adapters/dto/UpdateDiscountDto";
import { Role } from "../../entities/role";

export interface RoleRepository {
    existsById(id: number): Promise<boolean>;
    findAll(): Promise<Role[]>;
    findById(id: number): Promise<Role>;
    findByDiscount(discount: number): Promise<Role>;
    updateDiscount(payload: UpdateDiscountDto): Promise<Role>;
}
