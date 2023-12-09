import { Router, Request, Response } from "express";
import { RoleRepository } from "../use-case/ports/role.repository";
import RoleGateway from "./role.storage.gateway";
import { Role } from "../entities/role";
import { ResponseApi } from "../../../kernel/types";
import { validateError } from "../../../kernel/error_codes";
import { GetRolesInteractor } from "../use-case/get-role.interactor";

const RoleRouter = Router();

export class RoleController {

    static getRoles = async (req_: Request, res: Response) => {
        try {
            const repository: RoleRepository = new RoleGateway();
            const interactor: GetRolesInteractor = new GetRolesInteractor(repository);
            const roles = await interactor.execute();

            const body: ResponseApi<Role[]> = {
                code: 200,
                error: false,
                message: 'Roles encontrados',
                data: roles
            }
            return res.status(body.code).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.code).json(errorBody);
        }
    }
}
