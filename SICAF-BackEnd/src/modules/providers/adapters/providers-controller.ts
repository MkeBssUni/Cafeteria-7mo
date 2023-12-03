import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { ProvidersRepository } from "../use-cases/ports/providers-repository";
import { ProvidersStorageGateway } from "./providers-storage-gateway";
import { CreateProviderInteractor } from "../use-cases/create-provider-interactor";
import { ResponseApi } from "../../../kernel/types";
import { Provider } from "../entities/provider";

export class ProvidersController{
    static CreateProvider= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const repo: ProvidersRepository = new ProvidersStorageGateway();
            const interactor: CreateProviderInteractor = new CreateProviderInteractor(repo);
            const response= await interactor.execute(req.body)

            const body: ResponseApi<Provider>={
                code: 201,
                error: false,
                message: "Provider created",
                data: response
            }

            return res.status(body.code).json(body)
        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }
}