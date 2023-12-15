import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { UsersRepository } from "../use-cases/ports/users-repository";
import { UsersStorageGateway } from "./users-storage-gateway";
import { CreateUserInteractor } from "../use-cases/create-user-interactor";
import { ResponseApi } from "../../../kernel/types";
import { User } from "../entity/user";
import { GetCartByUserIdInteractor } from "../use-cases/get-cart-interactor";
import { ShoppingCart } from "../entity/shopping-cart";
import { GetUserInteractor } from "../use-cases/get-user-interactor";
import { ChangeStatusUserInteractor } from "../use-cases/change-status-interactor";
import { GetUsersByStatusInteractor } from "../use-cases/get-by-status-interactor";
import { UpdateCartInteractor } from "../use-cases/update-cart-interactor";
import { GetUserByEmailInteractor } from "../use-cases/get-user-by-email";
import { UpdateVisualConfigurationsInteractor } from "../use-cases/update-visual-configurations-interactor";
import { UpdateVisualConfigurationsDto } from "./dto/update-visual-configurations-dto";
import { UpdateUserInteractor } from "../use-cases/update-user-interactor";

export class UsersController{
    static Create = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: CreateUserInteractor = new CreateUserInteractor(repo);
            const user = await interactor.execute(req.body);

            const body: ResponseApi<User>={
                code: 201,
                error: false,
                message: 'Created',
                data: user
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static GetById = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: GetUserInteractor = new GetUserInteractor(repo);
            const cart = await interactor.execute(parseInt(req.params.id));

            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'OK',
                data: cart
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static GetCartById = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: GetCartByUserIdInteractor = new GetCartByUserIdInteractor(repo);
            const cart = await interactor.execute(parseInt(req.params.id));

            const body: ResponseApi<ShoppingCart>={
                code: 200,
                error: false,
                message: 'OK',
                data: cart
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static ChangeStatus = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: ChangeStatusUserInteractor = new ChangeStatusUserInteractor(repo);
            const user = await interactor.execute(parseInt(req.params.id));

            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'OK',
                data: user
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static FindAll = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const users = await repo.findAll();

            const body: ResponseApi<User[]>={
                code: 200,
                error: false,
                message: 'OK',
                data: users
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static FindByStatus = async (req: Request, res: Response) => {
        try {
            console.log("#kajndkjnaskdjnaskdjnaskdnj")
            console.log("adasdasdas",req.body.status)
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: GetUsersByStatusInteractor = new GetUsersByStatusInteractor(repo);
            const users = await interactor.execute(req.body.status);

            const body: ResponseApi<User[]>={
                code: 200,
                error: false,
                message: 'OK',
                data: users
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static UpdateShoppingCart = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: UpdateCartInteractor = new UpdateCartInteractor(repo);
            const cart = await interactor.execute(req.body);

            const body: ResponseApi<ShoppingCart>={
                code: 201,
                error: false,
                message: 'Updated',
                data: cart
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static GetByEmail = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: GetUserByEmailInteractor = new GetUserByEmailInteractor(repo);
            const user = await interactor.execute(req.body.email);

            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'OK',
                data: user
            }
            res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }

    static UpdateVisualConfigurations = async (req: Request, res: Response) => {
        try {
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: UpdateVisualConfigurationsInteractor = new UpdateVisualConfigurationsInteractor(repo);
            const user = await interactor.execute(req.body);

            const body: ResponseApi<UpdateVisualConfigurationsDto>={
                code: 200,
                error: false,
                message: 'OK',
                data: user
            }

            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }
    
    static UpdateUser = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const payload= {...req.body, user_id: id};
            const repo: UsersRepository = new UsersStorageGateway();
            const interactor: UpdateUserInteractor = new UpdateUserInteractor(repo);
            const user = await interactor.execute(payload);

            const body: ResponseApi<User>={
                code: 200,
                error: false,
                message: 'OK',
                data: user
            }

            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            res.status(error.code).json(error);
        }
    }
}