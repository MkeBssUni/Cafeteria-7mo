import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { GetUserDto, LoginDto } from "./dto";
import { AuthRepository } from "../use-cases/ports/auth.repository";
import { AuthStorageGateway } from "./auth.storage.gateway";
import { LoginInteractor } from "../use-cases";
import { ResponseApi } from "../../../kernel/types";

export class AuthController {
    static login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payload: LoginDto = {...req.body};
            const repository: AuthRepository = new AuthStorageGateway();
            const interactor: LoginInteractor = new LoginInteractor(repository);
            const user: GetUserDto = await interactor.execute(payload);
            const body: ResponseApi<GetUserDto> = {
                code: 200,
                error: false,
                message: 'OK',
                data: user
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }
}