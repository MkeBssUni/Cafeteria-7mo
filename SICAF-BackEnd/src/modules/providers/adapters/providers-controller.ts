import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { ProvidersRepository } from "../use-cases/ports/providers-repository";
import { ProvidersStorageGateway } from "./providers-storage-gateway";
import { CreateProviderInteractor } from "../use-cases/create-provider-interactor";
import { ResponseApi } from "../../../kernel/types";
import { Provider } from "../entities/provider";
import { ChangeStatusProviderInteractor } from "../use-cases/change-status-interactor";

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

    static ChangeStatusProvider= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const repo: ProvidersRepository = new ProvidersStorageGateway();
            const interactor: ChangeStatusProviderInteractor = new ChangeStatusProviderInteractor(repo);
            const response= await interactor.execute(parseInt(req.params.id))

            const body: ResponseApi<Provider>={
                code: 200,
                error: false,
                message: "Status changed",
                data: response
            }

            return res.status(body.code).json(body)
        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }
}