import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { GetReceiptDto, ReceiptDto, SaveOnlineOrderDto } from "./dto";
import { OrderStorageGateway } from "./order.storage.gateway";
import { OrderRepository } from "../use-cases/ports/order.repository";
import { GetReceiptInteractor, SaveOnlineOrderInteractor } from "../use-cases";
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

    static saveOnlineOrder = async (req: Request, res: Response) => {
        try {
            const payload: SaveOnlineOrderDto = {...req.body};
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: SaveOnlineOrderInteractor = new SaveOnlineOrderInteractor(repository);
            const order = await interactor.execute(payload);
            const body: ResponseApi<any> = {
                code: 201,
                error: false,
                message: 'Created',
                data: order
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }
}