import { Request, Response } from "express";
import { RoleRepository } from "../use-case/ports/role.repository";
import { RoleStorageGateway } from "./role.storage.gateway";
import { Role } from "../entities/role";
import { ResponseApi } from "../../../kernel/types";
import { validateError } from "../../../kernel/error_codes";
import { RolesInteractor } from "../use-case/GetRolesInteractor";

export class RoleController {

    static getRoles = async (req: Request, res: Response) => {
        try {
            const repository: RoleRepository = new RoleStorageGateway();
            const interactor: RolesInteractor = new RolesInteractor(repository);
            const roles = await interactor.execute();
            const body: ResponseApi<Role[]> = {
                code: 200,
                error: false,
                message: 'Lista de roles',
                data: roles
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

}
