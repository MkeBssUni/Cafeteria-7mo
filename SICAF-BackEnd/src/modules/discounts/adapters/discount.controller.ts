import { Request, Response } from "express";
import { DiscountRepository } from "../use-cases/ports/discount.repository";
import { DiscountStorageGateway } from "./discount.storage.gateway";
import { Discount } from "../entities/discount";
import { ResponseApi } from "../../../kernel/types";
import { validateError } from "../../../kernel/error_codes";
import { DiscountsDto, OrderDto, SaveDiscountDto, UpdateDiscountDto } from "./dto";
import { AllDiscountsInteractor, ChangeStatusInteractor, GetByOrderInteractor, SaveDiscountInteractor, UpdateDiscountInteractor } from "../use-cases";
import { DiscountsByTypeInteractor } from "../use-cases/DiscountsByTypeInteractor";

export class DiscountController {
    static findAllDiscounts = async (req: Request, res: Response) => {
        try {
            const repository: DiscountRepository = new DiscountStorageGateway();
            const interactor: AllDiscountsInteractor = new AllDiscountsInteractor(repository);
            const discounts: DiscountsDto = await interactor.execute();
            const body: ResponseApi<DiscountsDto> = {
                code: 200,
                error: false,
                message: 'Lista de descuentos',
                data: discounts
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static findDiscountsByType = async (req: Request, res: Response) => {
        try {
            const type: string = req.body.type;
            const repository: DiscountRepository = new DiscountStorageGateway();
            const interactor: DiscountsByTypeInteractor = new DiscountsByTypeInteractor(repository);
            const discounts: Discount[] = await interactor.execute(type);
            const body: ResponseApi<Discount[]> = {
                code: 200,
                error: false,
                message: `Lista: ${type}`,
                data: discounts
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static findDiscountsByOrder = async (req: Request, res: Response) => {
        try {
            const payload: OrderDto = {...req.body};
            const repository: DiscountRepository = new DiscountStorageGateway();
            const interactor: GetByOrderInteractor = new GetByOrderInteractor(repository);
            const discounts: Discount[] = await interactor.execute(payload);
            const body: ResponseApi<Discount[]> = {
                code: 200,
                error: false,
                message: 'OK',
                data: discounts
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static saveDiscount = async (req: Request, res: Response) => {
        try {
            const payload: SaveDiscountDto = {...req.body};
            const repository: DiscountRepository = new DiscountStorageGateway();
            const interactor: SaveDiscountInteractor = new SaveDiscountInteractor(repository);
            const discount: Discount = await interactor.execute(payload);
            const body: ResponseApi<Discount> = {
                code: 201,
                error: false,
                message: 'Created',
                data: discount
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static updateDiscount = async (req: Request, res: Response) => {
        try {
            const payload: UpdateDiscountDto = {...req.body};
            const repository: DiscountRepository = new DiscountStorageGateway();
            const interactor: UpdateDiscountInteractor = new UpdateDiscountInteractor(repository);
            const discount: Discount = await interactor.execute(payload);
            const body: ResponseApi<Discount> = {
                code: 200,
                error: false,
                message: 'Updated',
                data: discount
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static changeStatus = async (req: Request, res: Response) => {
        try {
            const id: number = parseInt(req.params.id);
            const repository: DiscountRepository = new DiscountStorageGateway();
            const interactor: ChangeStatusInteractor = new ChangeStatusInteractor(repository);
            const discount: boolean = await interactor.execute({id: id});
            const body: ResponseApi<boolean> = {
                code: 200,
                error: false,
                message: 'Status changed',
                data: discount
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }
}