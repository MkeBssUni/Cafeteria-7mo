import { Entity } from "../../../kernel/types";

export type Role = Entity<number> & {
    name: string;
    discount_id?: number;
    status: boolean;
    created_at: Date;
};
