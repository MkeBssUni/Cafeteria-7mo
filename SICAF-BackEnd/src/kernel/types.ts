import { Request } from "express";
import { SendReceiptDto } from "../modules/orders/adapters/dto";
import { DiscountEmailDto } from "../modules/discounts/adapters/dto";

export type Entity<Tidentifier extends number | string>={
    id?: Tidentifier
}

export type ResponseApi<T> = {
    code: number,
    error?: boolean,
    message?: string,
    data?: T | T[]
    count?: number
}

export type ResponseEmail<T> = {
    email?: string,
    password?: string,
    url?: string,
    data?: T,
    emails?: string[],
    receipt?: SendReceiptDto,
    discount?: DiscountEmailDto
}