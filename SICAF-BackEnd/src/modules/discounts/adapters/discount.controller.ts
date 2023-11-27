import { Request, Response } from "express";
import { SaveDiscountDto } from "./dto/SaveDiscountDto";
import { DiscountRepository } from "../use-cases/ports/discount.repository";
import { DiscountStorageGateway } from "./discount.storage.gateway";
import { SaveDiscountInteractor } from "../use-cases/SaveDiscountInteractor";
import { Discount } from "../entities/discount";
import { ResponseApi } from "../../../kernel/types";
import { validateError } from "../../../kernel/error_codes";

export class DiscountController {
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
            console.log(e)
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }
}