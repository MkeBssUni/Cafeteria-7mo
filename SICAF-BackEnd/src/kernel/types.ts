import { Request } from "express";

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