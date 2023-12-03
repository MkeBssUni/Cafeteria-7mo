import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { ProvidersRepository } from "../use-cases/ports/providers-repository";
import { ProvidersStorageGateway } from "./providers-storage-gateway";
import { CreateProviderInteractor } from "../use-cases/create-provider-interactor";
import { ResponseApi } from "../../../kernel/types";
import { Provider } from "../entities/provider";
import { ChangeStatusProviderInteractor } from "../use-cases/change-status-interactor";
import { UpdateProviderInteractor } from "../use-cases/update-provider-interactor";
import { GetProviderByIdInteractor } from "../use-cases/get-provider-by-id-interactor";

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

    static GetAllProviders= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const repo: ProvidersRepository = new ProvidersStorageGateway();
            const providers = await repo.getAll()

            const body: ResponseApi<Provider>={
                code: 200,
                error: false,
                message: "Providers",
                data: providers
            }

            return res.status(body.code).json(body)
        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static UpdateProvider= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const repo: ProvidersRepository = new ProvidersStorageGateway();
            const interactor: UpdateProviderInteractor = new UpdateProviderInteractor(repo);
            const id = parseInt(req.params.id)
            const response= await interactor.execute({...req.body, id})
            
            const body: ResponseApi<Provider>={
                code: 200,
                error: false,
                message: "Provider updated",
                data: response
            }

            return res.status(body.code).json(body)
        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static GetProviderById= async (req: Request, res: Response): Promise<Response>=>{
        try {
            const repo: ProvidersRepository = new ProvidersStorageGateway();
            const interactor: GetProviderByIdInteractor = new GetProviderByIdInteractor(repo);
            const response= await interactor.execute(parseInt(req.params.id))

            const body: ResponseApi<Provider>={
                code: 200,
                error: false,
                message: "Provider",
                data: response
            }

            return res.status(body.code).json(body)
        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }
}