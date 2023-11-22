import { Entity } from "../../../kernel/types";

export type Category = Entity<number> &{
    name: String,
    status: boolean,
    created_at: Date,
}