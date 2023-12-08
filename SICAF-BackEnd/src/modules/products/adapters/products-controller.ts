import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { ProductsRepository } from "../use-cases/ports/products-repository";
import { ProductsStorageGateway } from "./products-storage-gateway";
import { CreateProductInteractor } from "../use-cases/create-product-interactor";
import { ResponseApi } from "../../../kernel/types";
import { Product } from "../entities/product";
import { GetProductsInteractor } from "../use-cases/get-products-interactor";
import { GetProductWithCategoryDto } from "./dto/get-product-dto";
import { GetProductsByCategoryInteractor } from "../use-cases/get-products-by-category-interactor";
import { UpdateProductInteractor } from "../use-cases/update-product-interactor";
import { GetProductsByStatusInteractor } from "../use-cases/get-products-by-status-interactor";
import { GetProductInteractor } from "../use-cases/get-product-interactor";
import { ChangeStatusInteractor } from "../use-cases/change-status-interactor";
import { SearchByNameInteractor } from "../use-cases/search-by-name-itneractor";
import { GetProductsByStatusAndCategoryInteractor } from "../use-cases/get-products-by-status-and-category";

export class ProductsController {
    static CreateProduct = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: CreateProductInteractor = new CreateProductInteractor(repo);
            const response = await interactor.execute(req.body);

            const body: ResponseApi<Product> = {
                code: 201,
                error: false,
                message: "Created",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static GetProducts = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: GetProductsInteractor = new GetProductsInteractor(repo);
            const response = await interactor.execute();

            const body: ResponseApi<GetProductWithCategoryDto[]> = {
                code: 200,
                error: false,
                message: "OK",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static GetProductsByCategory = async (req: Request, res: Response): Promise<Response> => {
        const category_id = parseInt(req.params.category_id)
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: GetProductsByCategoryInteractor = new GetProductsByCategoryInteractor(repo);
            const response = await interactor.execute(category_id);

            const body: ResponseApi<GetProductWithCategoryDto[]> = {
                code: 200,
                error: false,
                message: "OK",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static UpdateProduct = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = req.params.id;
            const payload = { id, ...req.body }
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: UpdateProductInteractor = new UpdateProductInteractor(repo);
            const response = await interactor.execute(payload);

            const body: ResponseApi<Product> = {
                code: 200,
                error: false,
                message: "OK",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static GetProductsByStatus = async (req: Request, res: Response): Promise<Response> => {
        const status = req.params.status == "true" ? true : false;
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: GetProductsByStatusInteractor = new GetProductsByStatusInteractor(repo);
            const response = await interactor.execute(status);

            const body: ResponseApi<GetProductWithCategoryDto[]> = {
                code: 200,
                error: false,
                message: "OK",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static GetProductById = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: GetProductInteractor = new GetProductInteractor(repo);
            const response = await interactor.execute(parseInt(req.params.id));

            const body: ResponseApi<GetProductWithCategoryDto> = {
                code: 200,
                error: false,
                message: "OK",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static ChangeStatus = async (req: Request, res: Response): Promise<Response> => {

        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: ChangeStatusInteractor = new ChangeStatusInteractor(repo);
            const response = await interactor.execute(parseInt(req.params.id));

            const body: ResponseApi<GetProductWithCategoryDto> = {
                code: 200,
                error: false,
                message: "Status changed",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static SearchByName = async (req: Request, res: Response): Promise<Response> => {
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: SearchByNameInteractor = new SearchByNameInteractor(repo);
            const response = await interactor.execute(req.body.name);

            const body: ResponseApi<GetProductWithCategoryDto[]> = {
                code: 200,
                error: false,
                message: "ESTE SIGUE PENDIENTE DE REVISAR",
                data: response
            }

            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static GetProductsByCategoryAndStatus = async (req: Request, res: Response): Promise<Response> => {
        const dto = {
            status: req.params.status == "true" ? true : false,
            category_id: parseInt(req.params.category_id)
        }
        try {
            const repo: ProductsRepository = new ProductsStorageGateway();
            const interactor: GetProductsByStatusAndCategoryInteractor = new GetProductsByStatusAndCategoryInteractor(repo)
            const response = await interactor.execute(dto)

            const body: ResponseApi<GetProductWithCategoryDto[]> = {
                code: 200,
                error: false,
                message: "Ok",
                data: response
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error)
        }
    }
}