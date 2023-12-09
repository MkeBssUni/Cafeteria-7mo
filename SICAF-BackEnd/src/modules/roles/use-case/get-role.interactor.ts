import { UseCase } from "../../../kernel/contracts";
import { Role } from "../entities/role";
import { RoleRepository } from "./ports/role.repository";

export class GetRolesInteractor implements UseCase<null, Role[]>{
    constructor(private repository: RoleRepository){}

    execute(payload: null): Promise<Role[]> {
        const response = this.repository.getRoles();
        return response;
    }
}
