import { userBoundary } from "../../modules/user/adapters/user.bondary";
import { ResponseApi } from '../../kernel/types';
import { Router, Request, Response } from "express"
import { AuthRepository } from '../uses-cases/port/auth.repository';
import { AuthGateway } from "./auth.storage.gateway";
import { AuthenticateInteractor } from '../uses-cases/authenticate.interactor';
import { Authenticated } from "./dtos/authenticated.dto";
import { UserToAuth } from './dtos/user.auth.dto';
import { codeRecovery } from '../../utils/codePassword';
import { sendEmail } from '../../utils/recoveryPassword';
import { User } from "../../modules/user/entities/user";
import { GetUserByEmailDto } from "../../modules/user/adapters/dtos/get-user-by-email";
import { encode } from '../../utils/bcrypt';
import { validateError } from '../../kernel/error_codes';
const AuthRouter = Router()

export class AuthController {
    getError(error: any) {
        return {
            message: error.message,
            error: true,
            status: error.status
        }
    }

    login = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as UserToAuth;
            const repository: AuthRepository = new AuthGateway();
            const interactor: AuthenticateInteractor = new AuthenticateInteractor(repository);
    
            const response = await interactor.execute(payload);            

            const body: ResponseApi<Authenticated> = {
                status: 200,
                message: 'Autenticación exitosa',
                entity: response
            };
    
            return res.status(body.status).json(body);
        } catch (error) {
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }

    //obtener el usuario para mandar y guardar el codigo para cambio de contraseña
    sendCode = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as GetUserByEmailDto;
            const user = await userBoundary.findByEmail(payload) as User;

            const code = codeRecovery();
            user.code = code;

            await userBoundary.updateUser(user);

            await sendEmail(user.email, code);

            const body: ResponseApi<boolean> = {
                status: 200,
                message: `Correo enviado a ${user.email}`,
                entity: true,
                error: false
            }

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }

    compareCode = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as User;
            const user = await userBoundary.findByEmail(payload) as User;

            if (user.code === payload.code) {
                const body: ResponseApi<boolean> = {
                    status: 202,
                    error: false,
                    message: `Código correcto`,
                    entity: true
                }
                return res.status(body.status).json(body);
            } else {
                const body: ResponseApi<boolean> = {
                    status: 202,
                    error: false,
                    message: `Código incorrecto`,
                    entity: false
                }
                return res.status(body.status).json(body);
            }
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }

    recoveryPass = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as User;
            const user = await userBoundary.findByEmail(payload) as User;

            if (payload.password) {
                const encodedPassword = await encode(payload.password);
                if (typeof encodedPassword !== 'string') {
                    throw new Error('Error al codificar la contraseña');
                }
                payload.password = encodedPassword;
            }
            
            user.code = undefined

            await userBoundary.updateUser(user);

            const body: ResponseApi<boolean> = {
                status: 200,
                message: `Contraseña actualizada`,
                entity: true,
                error: false
            }

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }
}

const authController = new AuthController()

AuthRouter.post('/login', authController.login);
AuthRouter.post('/sendCode', authController.sendCode);
AuthRouter.post('/compareCode', authController.compareCode);
AuthRouter.post('/recoveryPass', authController.recoveryPass);

export default AuthRouter;