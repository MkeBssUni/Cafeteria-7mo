import { pool } from "../../../config/bdconfig";
import { Provider } from "../entities/provider";
import { ProvidersRepository } from "../use-cases/ports/providers-repository";
import { UpdateProviderDto } from "./dto/upadte-provider-dto";

export class ProvidersStorageGateway implements ProvidersRepository{
    
    async existsById(id: number): Promise<boolean> {
        try {
            const response = await pool.query("SELECT EXISTS(SELECT 1 FROM PROVIDERS WHERE id = $1);;",[id])
            return response.rows[0].exists;
        } catch (error) {
            throw Error
        }
    }

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
    
    async update(payload: UpdateProviderDto): Promise<Provider> {
        try {
            if(payload.address){
                const address_id = await pool.query(`SELECT address_id FROM providers WHERE id = $1;`, [payload.id])
                await pool.query(`UPDATE addresses SET street = $1, settlement = $2, external_number = $3, internal_number = $4, city = $5, state = $6, postal_code = $7, country = $8 WHERE id = $9;`, [payload.address.street, payload.address.settlement, payload.address.external_number, payload.address.internal_number, payload.address.city, payload.address.state, payload.address.postal_code, payload.address.country, address_id.rows[0].address_id])
            }
            await pool.query(`UPDATE providers SET name = $1, contact_name = $2, contact_lastname = $3, phone_number1 = $4, phone_number2 = $5, email = $6, ingredient = $7, notes = $8 WHERE id = $9 RETURNING *;`, [payload.name, payload.contact_name, payload.contact_lastname, payload.phone_number1, payload.phone_number2, payload.email, payload.ingredient, payload.notes, payload.id])
            
            const provider = await this.findById(payload.id!);

            return provider;
        } catch (error) {
            throw Error
        }
    }

    async getAll(): Promise<Provider[]> {
        try {
            const response = await pool.query(`select p.*, a.* from providers p inner join addresses a on p.address_id = a.id;`)
            const providers: Provider[] = response.rows.map((provider: any) => {
                return {
                    id: provider.id,
                    name: provider.name,
                    contact_name: provider.contact_name,
                    contact_lastname: provider.contact_lastname,
                    phone_number1: provider.phone_number1,
                    phone_number2: provider.phone_number2,
                    email: provider.email,
                    address: {
                        id: provider.address_id,
                        street: provider.street,
                        settlement: provider.settlement,
                        external_number: provider.external_number,
                        internal_number: provider.internal_number,
                        city: provider.city,
                        state: provider.state,
                        postal_code: provider.postal_code,
                        country: provider.country,
                        created_at: provider.created_at
                    },
                    ingredient: provider.ingredient,
                    notes: provider.notes,
                    status: provider.status
                }
            })
            return providers;
        } catch (error) {
            throw Error
        }
    }

    async findById(id: number): Promise<Provider> {
        try {
            const response = await pool.query(`select p.*, a.* from providers p inner join addresses a on p.address_id = a.id where p.id = $1;`, [id])
            const provider: Provider ={
                id: response.rows[0].id,
                name: response.rows[0].name,
                contact_name: response.rows[0].contact_name,
                contact_lastname: response.rows[0].contact_lastname,
                phone_number1: response.rows[0].phone_number1,
                phone_number2: response.rows[0].phone_number2,
                email: response.rows[0].email,
                address: {
                    id: response.rows[0].address_id,
                    street: response.rows[0].street,
                    settlement: response.rows[0].settlement,
                    external_number: response.rows[0].external_number,
                    internal_number: response.rows[0].internal_number,
                    city: response.rows[0].city,
                    state: response.rows[0].state,
                    postal_code: response.rows[0].postal_code,
                    country: response.rows[0].country,
                    created_at: response.rows[0].created_at
                },
                ingredient: response.rows[0].ingredient,
                notes: response.rows[0].notes,
                status: response.rows[0].status
            }

            return provider;
        } catch (error) {
            throw Error
        }
    }

    async changeStatus(id: number): Promise<Provider> {
        try {
            const response = await pool.query(`UPDATE providers SET status = NOT status WHERE id = $1;`, [id])
            const provider = await pool.query(`select p.*, a.* from providers p inner join addresses a on p.address_id = a.id where p.id = $1;`, [id])
            const providerResponse: Provider ={
                id: provider.rows[0].id,
                name: provider.rows[0].name,
                contact_name: provider.rows[0].contact_name,
                contact_lastname: provider.rows[0].contact_lastname,
                phone_number1: provider.rows[0].phone_number1,
                phone_number2: provider.rows[0].phone_number2,
                email: provider.rows[0].email,
                address: {
                    id: provider.rows[0].address_id,
                    street: provider.rows[0].street,
                    settlement: provider.rows[0].settlement,
                    external_number: provider.rows[0].external_number,
                    internal_number: provider.rows[0].internal_number,
                    city: provider.rows[0].city,
                    state: provider.rows[0].state,
                    postal_code: provider.rows[0].postal_code,
                    country: provider.rows[0].country,
                    created_at: provider.rows[0].created_at
                },
                ingredient: provider.rows[0].ingredient,
                notes: provider.rows[0].notes,
                status: provider.rows[0].status
            }
            return providerResponse;
        } catch (error) {
            throw Error
        }
    }

}