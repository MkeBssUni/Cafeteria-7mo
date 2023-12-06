import { pool } from "../../../config/bdconfig";
import { encodeString } from "../../../kernel/jwt";
import { User } from "../entity/user";
import { UsersRepository } from "../use-cases/ports/users-repository";
import { UpdateUserDto } from "./dto/update-user-dto";

export class UsersStorageGateway implements UsersRepository{
    async create(payload: User): Promise<User> {
        try {
            await pool.query('BEGIN')
            const responseUser = await pool.query('INSERT INTO users (email, password, role_id) VALUES ($1, $2, $3) RETURNING *', [payload.email, await encodeString(payload.password), payload.role_id]);
            const user = responseUser.rows[0];
            const responseAddress = await pool.query('INSERT INTO addresses (street, settlement, external_number, internal_number, city, state, postal_code, country) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [payload.person.address.street, payload.person.address.settlement, payload.person.address.external_number, payload.person.address.internal_number, payload.person.address.city, payload.person.address.state, payload.person.address.postal_code, payload.person.address.country]);
            const address = responseAddress.rows[0];
            const responsePerson = await pool.query('INSERT INTO people (user_id, name, lastname, gender, birthday, phone_number1, phone_number2, address_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[
                user.id, payload.person.name, payload.person.lastname, payload.person.gender, payload.person.birthday, payload.person.phone_number1, payload.person.phone_number2, address.id
            ]);
            
            await pool.query('COMMIT')
            return this.findById(user.id);
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
        try {
            const user = await pool.query('select u.*, p.*, a.* from users u inner join people p on u.id = p.user_id inner join addresses a on p.address_id = a.id where u.id = $1', [id]);
            return user.rows[0];
        } catch (error) {
            throw new Error
        }
    }

    async findByEmail(email: string): Promise<User> {
        try {
            const user = await pool.query('select u.*, p.*, a.* from users u inner join people p on u.id = p.user_id inner join addresses a on p.address_id = a.id where u.email = $1', [email]);
            return user.rows[0];
        } catch (error) {
            throw new Error
        }
    }

    async existsByEmail(email: string): Promise<boolean> {
        try {
            const response = await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)', [email]);
            return response.rows[0].exists;
        } catch (error) {
            throw Error
        }
    }

    async existsById(id: number): Promise<boolean> {
        try {
            const response = await pool.query('SELECT EXISTS(SELECT 1 FROM users WHERE id = $1)', [id]);
            return response.rows[0].exists;
        } catch (error) {
            throw Error
        }
    }
    
    async update(payload: UpdateUserDto): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async changeStatus(id: number): Promise<User> {
        try {
            const response = await pool.query('UPDATE users SET status = NOT status WHERE id = $1 RETURNING *', [id]);
            
            return this.findById(response.rows[0].id);
        } catch (error) {
            throw new Error
        }
    }

}