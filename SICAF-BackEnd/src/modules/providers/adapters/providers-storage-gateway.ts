import { pool } from "../../../config/bdconfig";
import { Provider } from "../entities/provider";
import { ProvidersRepository } from "../use-cases/ports/providers-repository";

export class ProvidersStorageGateway implements ProvidersRepository{
    async existsByName(name: String): Promise<boolean> {
        try {
            const response = await pool.query("SELECT EXISTS(SELECT 1 FROM PROVIDERS WHERE UPPER(name) = $1);;",[name.toUpperCase()])
            return response.rows[0].exists;   
        } catch (error) {
            throw Error
        }
    }
    
    async existsByEmail(email: String): Promise<boolean> {
        try {
            const response = await pool.query("SELECT EXISTS(SELECT 1 FROM PROVIDERS WHERE UPPER(email) = $1);;",[email.toUpperCase()])
            return response.rows[0].exists;   
        } catch (error) {
            throw Error
        }
    }

    async create(payload: Provider): Promise<Provider> {
        try {
            const responseAddress = await pool.query(`INSERT INTO addresses (street, settlement, external_number, internal_number, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [payload.address.street, payload.address.settlement, payload.address.external_number, payload.address.internal_number, payload.address.city, payload.address.state, payload.address.postal_code, payload.address.country])
            const address = responseAddress.rows[0]
            const responseProvider = await pool.query(`INSERT INTO providers (name, contact_name, contact_lastname, phone_number1, phone_number2, email, address_id, ingredient, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [payload.name, payload.contact_name, payload.contact_lastname, payload.phone_number1, payload.phone_number2, payload.email, address.id, payload.ingredient, payload.notes])
            const provider: Provider ={
                id: responseProvider.rows[0].id,
                name: responseProvider.rows[0].name,
                contact_name: responseProvider.rows[0].contact_name,
                contact_lastname: responseProvider.rows[0].contact_lastname,
                phone_number1: responseProvider.rows[0].phone_number1,
                phone_number2: responseProvider.rows[0].phone_number2,
                email: responseProvider.rows[0].email,
                address: {
                    id: responseProvider.rows[0].address_id,
                    street: address.street,
                    settlement: address.settlement,
                    external_number: address.external_number,
                    internal_number: address.internal_number,
                    city: address.city,
                    state: address.state,
                    postal_code: address.postal_code,
                    country: address.country,
                    created_at: address.created_at
                },
                ingredient: responseProvider.rows[0].ingredient,
                notes: responseProvider.rows[0].notes,
                status: responseProvider.rows[0].status
            }
            return provider
        } catch (error) {
            throw Error
        }
    }
    update(provider: Provider): Promise<Provider> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Provider[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Provider> {
        throw new Error("Method not implemented.");
    }
    changeStatus(id: number): Promise<Provider> {
        throw new Error("Method not implemented.");
    }

}