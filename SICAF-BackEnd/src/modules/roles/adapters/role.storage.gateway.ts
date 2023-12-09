import { Role } from "../entities/role";
import { RoleRepository } from "../use-case/ports/role.repository";
import { pool } from '../../../config/bdconfig';
import { UpdateDiscountDto } from "./dto";

export default class RoleGateway implements RoleRepository {
    async getRoles(): Promise<Role[]>{
        const client = await pool.connect()
        try {
            const query = await client.query('SELECT * FROM roles order by id asc');
            const result = (query).rows as Role[];

            return result;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    async updateDiscount(payload: UpdateDiscountDto): Promise<Role> {
        try {
            const { id, discount } = payload;
            const response = await pool.query('update roles set discount_id = $2 where id = $1 returning *', [id, discount]);
            return response.rows[0] as Role;
        } catch (e) {
            throw new Error;
        }
    }
}
