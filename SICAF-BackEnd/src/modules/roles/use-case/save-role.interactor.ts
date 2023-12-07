import { RoleRepository } from './ports/role.repository';
import { Role } from "../entities/role";
import { UseCase } from "../../../kernel/contracts";
import { SaveRole } from "../adapters/dto/save-role";

export default class SaveRoleInteractor implements UseCase<SaveRole, Role>{
    constructor(private RoleRepository: RoleRepository){}
    execute(payload: SaveRole): Promise<Role> {
        if(!payload.name || !payload.status || !payload.created_at) throw new Error("Missing fields");
        return this.RoleRepository.save(payload)
    }
}
