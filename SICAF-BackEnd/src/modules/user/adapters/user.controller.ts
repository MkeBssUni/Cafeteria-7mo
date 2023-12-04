import { Router, Request, Response } from 'express'
import { UserRepository } from "../use-case/ports/user.repository";
import UserGateway from './user.storage.gateway';
import { SaveUser } from "./dtos/save-user";
import SaveUserInteractor from "../use-case/save-user.interactor";
import { User } from "../entities/user";
import { ResponseApi } from '../../../kernel/types';
import { GetUserByEmailDto } from './dtos/get-user-by-email';
import GetByEmailInteractor from '../use-case/get-by-email';
import { UpdateUserInteractor } from "../use-case/update-user.interactor";
import { validateError } from '../../../kernel/error_codes';
import { compare, encode } from '../../../utils/bcrypt';

const UserRouter = Router();

export class UserController {
    getError(error: any) {
        return {
            status: error.status,
            message: error.message,
            error: true
        }
    }
    
    //obtener usuario por email
    static findByEmail = async (payload: GetUserByEmailDto) => { // Renombrar método a findByEmail
        try {
            const repository: UserRepository = new UserGateway();
            const interactor: GetByEmailInteractor = new GetByEmailInteractor(repository); // Renombrar interactor a GetByEmailInteractor

            const response = await interactor.execute(payload);

            return response;
        } catch (error) {
            throw error;
        }
    }

    //actualizar usuario
    static updateUser = async (payload: User) => {
        try {
            const repository: UserRepository = new UserGateway();
            const interactor: UpdateUserInteractor = new UpdateUserInteractor(repository);

            const response = await interactor.execute(payload);

            return response;
        } catch (error) {
            throw error
        }
    }

    //METODOS DE RUTAS

    //guardar usuario
    static saveUser = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as SaveUser;
            console.log('Payload received:', payload);
    
            const repository: UserRepository = new UserGateway();
            const interactor: SaveUserInteractor = new SaveUserInteractor(repository);
    
            const response = await interactor.execute(payload);
            console.log('User saved:', response);
    
            const body: ResponseApi<User> = {
                status: 201,
                message: 'Usuario guardado exitosamente',
                entity: response
            };
    
            return res.status(body.status).json(body);
        } catch (error) {
            console.error('Error saving user:', error);
            const errorBody = validateError(error as Error);
            return res.status(500).json({ error: 'ERROR al guardar USER'});
        }
    }

    //getByEmail
    static findByEmailRoute = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as GetUserByEmailDto;
            const user = await this.findByEmail(payload); // Llamar al método findByEmail

            const body: ResponseApi<User> = {
                status: 200,
                message: 'Usuario encontrado',
                entity: user
            };

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }

    static getUsers = async (req_: Request, res: Response) => {
        try {
            const repository: UserRepository = new UserGateway();
            const users = await repository.getUsers();

            const body: ResponseApi<User[]> = {
                status: 200,
                message: 'Usuarios encontrados',
                entity: users
            };

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }

    static comparePassword = async(req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as User;
            const user = await this.findByEmail({ email: payload.email });

            const compared = await compare(payload.password, user.password);       

            const body: ResponseApi<boolean> = {
                status: 200,
                message: 'Contraseña correcta',
                entity: compared
            };

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }

    static changePassword = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as User;
            
            if (payload.password) {
                const encodedPassword = await encode(payload.password);
                if (typeof encodedPassword !== 'string') {
                    throw new Error('Error al codificar la contraseña');
                }
                payload.password = encodedPassword;
            }
            
            const user = await this.updateUser(payload);

            const body: ResponseApi<User> = {
                status: 200,
                message: 'Usuario actualizado',
                entity: user
            };

            return res.status(body.status).json(body);
        } catch (error) {
            const errorBody = validateError(error as Error);
            return res.status(errorBody.status).json(errorBody);
        }
    }

    static updateUserRoute = async (req: Request, res: Response) => {
        try {
          const payload = { ...req.body } as User;
      
          const repository: UserRepository = new UserGateway();
          const interactor: UpdateUserInteractor = new UpdateUserInteractor(repository);
      
          const updatedUser = await interactor.execute(payload);
      
          const body: ResponseApi<User> = {
            status: 200,
            message: 'Usuario actualizado',
            entity: updatedUser,
          };
      
          return res.status(200).json(body); // Establecer el código de estado explícitamente a 200
        } catch (error) {
          console.error('Error updating user:', error);
          const errorBody = validateError(error as Error);
          return res.status(errorBody.status || 500).json(errorBody); // Manejo de errores y código de estado por defecto
        }
      }

    static changeUserStatus = async (req: Request, res: Response) => {
        try {
            const payload = { ...req.body } as User;
            
            const repository: UserRepository = new UserGateway();
            const user = await repository.changeUserStatus(payload);
    
            const body: ResponseApi<User> = {
                status: 200, // Establecer el código de estado 200 para indicar éxito
                message: 'Estado del usuario cambiado',
                entity: user
            };
    
            return res.status(200).json(body); // Asegurarse de que el código de estado sea 200 al enviar la respuesta
        } catch (error) {
            const errorBody = validateError(error as Error);            
            return res.status(errorBody.status || 500).json(errorBody); // Manejo de errores y código de estado por defecto
        }
    }
}

UserRouter.post('/', UserController.saveUser);
UserRouter.get('/', UserController.findByEmailRoute);
UserRouter.get('/', UserController.getUsers);
UserRouter.put('/changePassword', UserController.changePassword);
UserRouter.post('/comparePassword', UserController.comparePassword);
UserRouter.put('/updateUser', UserController.updateUserRoute);
UserRouter.put('/changeUserStatus', UserController.changeUserStatus);

export default UserRouter;