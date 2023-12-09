import { UseCase } from "../../../kernel/contracts";
import { Role } from "../entities/role";
import { RoleRepository } from "./ports/role.repository";

export class GetRolesInteractor implements UseCase<null, Role[]>{
    constructor(private repository: RoleRepository){}

    execute(): Promise<Role[]> {
        return this.repository.getRoles();
    }
}
