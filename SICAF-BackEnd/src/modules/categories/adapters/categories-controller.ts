import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { CategoriesRepository } from "../use-cases/ports/categories-repository";
import { CategoriesStorageGateway } from "./categories-storage-gateway";
import { SaveCategoryInteractor } from "../use-cases/ports/save-category-interactor";
import { ResponseApi } from "../../../kernel/types";
import { Category } from "../entities/category";
import { GetCategoriesByStatusInteractor } from "../use-cases/get-categories-by-status-interactor";
import { GetCategoriesInteractor } from "../use-cases/ports/get-categories-interactor";
import { GetCategoryByIdInteractor } from "../use-cases/get-category-interactor";
import { ChangeStatusInteractor } from "../use-cases/change-statuts-interactor";
import { UpdateCategoryInteractor } from "../use-cases/update-category-interactor";
import { SearchByNameInteractor } from "../use-cases/search-by-name-interactor";

export class CategoriesController{
    static CreateCategory= async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const interactor: SaveCategoryInteractor = new SaveCategoryInteractor(repo);
            const response = await interactor.execute(req.body);

            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Created',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static GetCategories= async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const interactor: GetCategoriesInteractor = new GetCategoriesInteractor(repo);
            const response = await interactor.execute();
            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Ok',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static GetCategoriesByStatus= async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const interactor: GetCategoriesByStatusInteractor = new GetCategoriesByStatusInteractor(repo);
            const response = await interactor.execute(req.params.status);
            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Ok',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static GetCategoryById= async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const interactor: GetCategoryByIdInteractor = new GetCategoryByIdInteractor(repo);
            const response = await interactor.execute(parseInt(req.params.id));
            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Ok',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static ChangeStatusCategory= async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const payload = {
                id: parseInt(req.params.id),
                status: req.body.status
            }
            const interactor: ChangeStatusInteractor = new ChangeStatusInteractor(repo);
            const response = await interactor.execute(payload);
            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Status changed',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static UpdateCategory = async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const payload = {
                id: parseInt(req.params.id),
                name: req.body.name,
                status: req.body.status
            }
            const interactor: UpdateCategoryInteractor = new UpdateCategoryInteractor(repo);
            const response = await interactor.execute(payload);
            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Updated',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }

    static SearchCategories = async (req: Request, res:Response):Promise<Response>=>{
        try {
            const repo: CategoriesRepository = new CategoriesStorageGateway();
            const interactor: SearchByNameInteractor = new SearchByNameInteractor(repo);
            const response = await interactor.execute(req.body.name);
            const body: ResponseApi<Category>={
                code: 200,
                error: false,
                message: 'Ok',
                data: response
            }
            return res.status(body.code).json(body)

        } catch (e) {
            const error = validateError(e as Error)
            return res.status(error.code).json(error)
        }
    }
}