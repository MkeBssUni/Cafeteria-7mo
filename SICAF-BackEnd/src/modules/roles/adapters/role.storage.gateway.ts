import { Role } from "../entities/role";
import { RoleRepository } from "../use-case/ports/role.repository";
import { pool } from '../../../config/bdconfig';
import { UpdateDiscountDto } from "./dto/UpdateDiscountDto";

export class RoleStorageGateway implements RoleRepository {
    async findAll(): Promise<Role[]> {
        const client = await pool.connect()
        try {
            const result = await client.query('select * from roles order by id asc');
            return result.rows as Role[];
        } catch (e) {
            throw new Error;
        } finally {
            client.release();
        }
    }

    async findById(id: number): Promise<Role> {
        const client = await pool.connect()
        try {
            const result = await client.query('select * from roles where id = $1', [id]);
            return result.rows[0] as Role;
        } catch (e) {
            throw new Error;
        } finally {
            client.release();
        }
    }

    async updateDiscount(payload: UpdateDiscountDto): Promise<Role> {
        const client = await pool.connect()
        try {
            const { id, discount } = payload;
            const response = await client.query('update roles set discount_id = $2 where id = $1 returning *', [id, discount]);
            return response.rows[0] as Role;
        } catch (e) {
            throw new Error;
        } finally {
            client.release();
        }
    }
}
