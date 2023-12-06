import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { UsersRepository } from "../use-cases/ports/users-repository";
import { UsersStorageGateway } from "./users-storage-gateway";
import { CreateUserInteractor } from "../use-cases/create-user-interactor";
import { ResponseApi } from "../../../kernel/types";
import { User } from "../entity/user";
import { GetCartByUserIdInteractor } from "../use-cases/get-cart-interactor";
import { ShoppingCart } from "../entity/shopping-cart";

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
}