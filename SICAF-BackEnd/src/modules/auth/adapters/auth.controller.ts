import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { GetUserDto, LoginDto, ResetPwdDto, ResetTokenDto } from "./dto";
import { AuthRepository } from "../use-cases/ports/auth.repository";
import { AuthStorageGateway } from "./auth.storage.gateway";
import { LoginInteractor, ResetPwdInteractor, ResetTokenInteractor } from "../use-cases";
import { ResponseApi } from "../../../kernel/types";
import { generateToken } from "../../../kernel/jwt";

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
            const token = generateToken(user);
            return res.header('Authorization', `Bearer ${token}`).status(body.code).json({
                ...body,
                token: token
            });
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static generateResetToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payload = {
                email: req.body.email,
                origin: `${req.headers.origin}`,
                path: `${req.body.path}`
            } as ResetTokenDto;

            const repository: AuthRepository = new AuthStorageGateway();
            const interactor: ResetTokenInteractor = new ResetTokenInteractor(repository);
            const response: boolean = await interactor.execute(payload);
            const body: ResponseApi<boolean> = {
                code: 200,
                error: response,
                message: 'Token generated'
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static resetPassword = async (req: Request, res: Response): Promise<Response> => {
        try {
            const payload = {
                password: req.body.password,
                token: req.query.token as string
            } as ResetPwdDto;

            const repository: AuthRepository = new AuthStorageGateway();
            const interactor: ResetPwdInteractor = new ResetPwdInteractor(repository);
            const user: GetUserDto = await interactor.execute(payload);
            const body: ResponseApi<GetUserDto> = {
                code: 200,
                error: false,
                message: 'Ok',
                data: user
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }
}