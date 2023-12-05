import { SaveRole } from "../../adapters/dto/save-role";
import { Role } from "../../entities/role";

export interface RoleRepository {
    save(payload: SaveRole): Promise<Role>;
    getRoles(): Promise<Role[]>;
}
