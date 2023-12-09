import { UpdateDiscountDto } from "../../adapters/dto";
import { Role } from "../../entities/role";

export interface RoleRepository {
    getRoles(): Promise<Role[]>;
    updateDiscount(payload: UpdateDiscountDto): Promise<Role>;
}
