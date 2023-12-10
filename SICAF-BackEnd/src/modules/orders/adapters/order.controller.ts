import { Request, Response } from "express";
import { validateError } from "../../../kernel/error_codes";
import { FilterDto, GetReceiptDto, OnlineOrderHistoryDto, OrderHistoryDto, ReceiptDto, SaveOnlineOrderDto, SaveOrderDto } from "./dto";
import { OrderStorageGateway } from "./order.storage.gateway";
import { OrderRepository } from "../use-cases/ports/order.repository";
import { AllOnlineOrdersInteractor, AllOrdersInteractor, GetReceiptInteractor, OnlineOrderHistoryInteractor, OrderHistoryInteractor, SaveOnlineOrderInteractor, SaveOrderInteractor } from "../use-cases";
import { ResponseApi } from "../../../kernel/types";
import { Order } from "../entities/order";

export class OrderController {
    static getReceipt = async (req: Request, res: Response) => {
        try {
            const payload: GetReceiptDto = {...req.body};
            const interactor: GetReceiptInteractor = new GetReceiptInteractor();
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

    static getAllOrders = async (req: Request, res: Response) => {
        try {
            const payload: FilterDto = {...req.body};
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: AllOrdersInteractor = new AllOrdersInteractor(repository);
            const orders: OrderHistoryDto[] = await interactor.execute(payload);
            const body: ResponseApi<OrderHistoryDto[]> = {
                code: 200,
                error: false,
                message: 'Historial de compras',
                data: orders
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static getAllOnlineOrders = async (req: Request, res: Response) => {
        try {
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: AllOnlineOrdersInteractor = new AllOnlineOrdersInteractor(repository);
            const orders: OnlineOrderHistoryDto[] = await interactor.execute();
            const body: ResponseApi<OnlineOrderHistoryDto[]> = {
                code: 200,
                error: false,
                message: 'Historial de pedidos en línea',
                data: orders
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static getOrderHistoryByClient = async (req: Request, res: Response) => {
        try {
            const client: number = parseInt(req.params.client);
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: OrderHistoryInteractor = new OrderHistoryInteractor(repository);
            const orders: OrderHistoryDto[] = await interactor.execute(client);
            const body: ResponseApi<OrderHistoryDto[]> = {
                code: 200,
                error: false,
                message: 'Historial de compras del cliente',
                data: orders
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static getOnlineOrderHistoryByClient = async (req: Request, res: Response) => {
        try {
            const client: number = parseInt(req.params.client);
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: OnlineOrderHistoryInteractor = new OnlineOrderHistoryInteractor(repository);
            const orders: OnlineOrderHistoryDto[] = await interactor.execute(client);
            const body: ResponseApi<OnlineOrderHistoryDto[]> = {
                code: 200,
                error: false,
                message: 'Historial de pedidos en línea del cliente',
                data: orders
            }
            return res.status(body.code).json(body);
        } catch (e) {
            const error = validateError(e as Error);
            return res.status(error.code).json(error);
        }
    }

    static saveOrder = async (req: Request, res: Response) => {
        try {
            const payload: SaveOrderDto = {...req.body};
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: SaveOrderInteractor = new SaveOrderInteractor(repository);
            const order = await interactor.execute(payload);
            const body: ResponseApi<Order> = {
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

    static saveOnlineOrder = async (req: Request, res: Response) => {
        try {
            const payload: SaveOnlineOrderDto = {...req.body};
            const repository: OrderRepository = new OrderStorageGateway();
            const interactor: SaveOnlineOrderInteractor = new SaveOnlineOrderInteractor(repository);
            const order = await interactor.execute(payload);
            const body: ResponseApi<Order> = {
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