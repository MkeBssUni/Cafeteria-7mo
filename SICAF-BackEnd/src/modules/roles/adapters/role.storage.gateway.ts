import { SaveRole } from "./dto/save-role";
import { Role } from "../entities/role";
import { RoleRepository } from "../use-case/ports/role.repository";
import { pool } from '../../../config/bdconfig';
import { UpdateDiscountDto } from "./dto";

export default class RoleGateway implements RoleRepository {
    async save(payload: SaveRole): Promise<Role>{
        const client = await pool.connect();

        try {
            const roleExists = await client.query('SELECT * FROM roles WHERE name = $1', [payload.name])
            if (roleExists.rowCount > 0){
                throw new Error("Este role ya existe")
            }

            const query = await client.query(
                `INSERT INTO roles (name, discount_id, status, created_at) VALUES ($1, $2, $3, $4) RETURNING *`,
                [payload.name, payload.discount_id, payload.status, payload.created_at]
            );

            const result: Role = query.rows[0];

            return result;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }

    async getRoles(): Promise<Role[]>{
        const client = await pool.connect()
        try {
            const query = await client.query('SELECT * FROM roles');
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
