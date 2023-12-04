import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { GetReceiptDto, ReceiptDto } from "./dto";
import { OrderStorageGateway } from "./order.storage.gateway";
import { OrderRepository } from "../use-cases/ports/order.repository";
import { GetReceiptInteractor } from "../use-cases";
import { ResponseApi } from "../../../kernel/types";

export class OrderController {
    static getReceipt = async (req: Request, res: Response) => {
        try {
            const payload: GetReceiptDto = {...req.body};
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: GetReceiptInteractor = new GetReceiptInteractor(repository);
            const receipt: ReceiptDto = await interactor.execute(payload);
            const body: ResponseApi<ReceiptDto> = {
                code: 200,
                error: false,
                message: 'OK',
                data: receipt
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }
}