import { pool } from "../../../config/bdconfig";
import { User } from "../entity/user";
import { UsersRepository } from "../use-cases/ports/users-repository";
import { UpdateUserDto } from "./dto/update-user-dto";

export class UsersStorageGateway implements UsersRepository{
    async create(payload: User): Promise<User> {
        try {
            await pool.query('BEGIN')
            const responseUser = await pool.query('INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *', [payload.email, payload.password, payload.role_id]);
            const user = responseUser.rows[0];
            const responseAddress = await pool.query('INSERT INTO addresses (street, settlement, external_number, internal_number, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [payload.person.address.street, payload.person.address.settlement, payload.person.address.external_number, payload.person.address.internal_number, payload.person.address.city, payload.person.address.state, payload.person.address.postal_code, payload.person.address.country]);
            const address = responseAddress.rows[0];
            const responsePerson = await pool.query('INSERT INTO people (user_id, name, lastname, gender, birthday, phone_number1, phone_number2, address_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[
                user.id, payload.person.name, payload.person.lastname, payload.person.gender, payload.person.birthday, payload.person.phone_number1, payload.person.phone_number2, address.id
            ]);
            const person = responsePerson.rows[0];

            const finalUser: User ={
                user_id: user.id,
                email: user.email,
                password: user.password,
                role_id: user.role_id,
                dark_theme: user.dark_theme,
                letter_size: user.letter_size,
                reset_token: user.reset_token,
                status: user.status,
                created_at: user.created_at,
                person:{
                    person_id: person.id,
                    user_id: person.user_id,
                    name: person.name,
                    lastname: person.lastname,
                    gender: person.gender,
                    birthday: person.birthday,
                    phone_number1: person.phone_number1,
                    phone_number2: person.phone_number2,
                    address:{
                        id: address.id,
                        street: address.street,
                        settlement: address.settlement,
                        external_number: address.external_number,
                        internal_number: address.internal_number,
                        city: address.city,
                        state: address.state,
                        postal_code: address.postal_code,
                        country: address.country,
                    }
                }
            }
            await pool.query('COMMIT')
            return finalUser;
        } catch (error) {
            await pool.query('ROLLBACK')
            console.log("Error: ", error)
            throw Error
        }
    }

    async findAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async findByStatus(status: boolean): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async existsByEmail(email: string): Promise<boolean> {
        return false
    }

    async existsById(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    async update(payload: UpdateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async changeStatus(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }

}