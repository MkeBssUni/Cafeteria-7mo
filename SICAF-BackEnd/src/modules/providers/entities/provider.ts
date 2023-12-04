import { Entity } from "../../../kernel/types";

export type Provider = Entity<number> &{
    name: String,
    contact_name?: String,
    contact_lastname?: String,
    phone_number1: String,
    phone_number2?: String,
    email: String,
    address:{
        id?: number,
        street: String,
        settlement: String,
        external_number?: String,
        internal_number?: String,
        city: String,
        state: String,
        postal_code: String,
        country: String,
        created_at?: Date,
    },
    ingredient?: String,
    notes?: String,
    status?: boolean,

}