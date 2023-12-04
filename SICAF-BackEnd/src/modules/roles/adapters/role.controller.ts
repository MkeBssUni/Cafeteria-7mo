import { Router, Request, Response } from "express";
import { RoleRepository } from "../use-case/ports/role.repository";
import RoleGateway from "./role.storage.gateway";
import { SaveRole } from './dto/save-role';
import SaveRoleInteractor from "../use-case/save-role.interactor";
import { Role } from "../entities/role";
import { ResponseApi } from "../../../kernel/types";
import { validateError } from "../../../kernel/error_codes";

const RoleRouter = Router();

export class RoleController {
    getError(error: any){
        return{
            status: error.status,
            message: error.message,
            error: true
        }
    }

    //saveRole
    static saveRole =async (req: Request, res: Response) => {
        try {
            const payload = {...req.body} as SaveRole;
            console.log('Payload recived:', payload);
            

            const repository: RoleRepository = new RoleGateway();
            const interactor: SaveRoleInteractor = new SaveRoleInteractor(repository);

            const response = await interactor.execute(payload);

            const body: ResponseApi<Role> = {
                status: 201,
                message: 'Role guardado exitosamente',
                entity: response
            };

            return res.status(body.status).json(body)
        } catch (error) {
            const errorBody = validateError(error as Error);
            console.log(errorBody);
            
            return res.status(500).json({ error: 'ERROR al guardar ROLE'})
        }
    }

    static getRoles = async (req_: Request, res: Response) => {
        try {
            const repository: RoleRepository = new RoleGateway();
            const roles = await repository.getRoles();

            const body: ResponseApi<Role[]> = {
                status: 200,
                message: 'Roles encontrados',
                entity: roles
            }

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }
}

RoleRouter.post('/', RoleController.saveRole);
RoleRouter.get('/', RoleController.getRoles)

export default RoleRouter;
