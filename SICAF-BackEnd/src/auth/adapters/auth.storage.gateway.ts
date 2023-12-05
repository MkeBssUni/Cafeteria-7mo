import { Authenticated } from './dtos/authenticated.dto';
import { UserAuth } from '../entities/user.auth';
import { AuthRepository } from '../uses-cases/port/auth.repository';
import { pool } from '../../config/bdconfig';
import { generateToken } from '../../config/jwt';
import { compare } from '../../utils/bcrypt';
import { UserToAuth } from './dtos/user.auth.dto';
import { User } from '../../modules/user/entities/user';

export class AuthGateway implements AuthRepository {
    //metodo para loguear un usuario
    async login(payload: UserToAuth): Promise<Authenticated & User> {
        const client = await pool.connect();
        try {
            const query = await client.query(`SELECT * FROM users WHERE email = $1`, [payload.email]);
            const result = query.rows[0] as UserAuth;

            if (!result) throw new Error("Unauthorized");

            if (!(await compare(payload.password, result.password))) {
                return { token: null, email: null} as Authenticated & User;
            }

            const token = generateToken({
                email: result.email,
            });

            return {
                token,
                email: payload.email,
                role_id: result.role_id,
                dark_theme: result.dark_theme,
                letter_size: result.letter_size,
                status: result.status,
                created_at: result.created_at,
            } as Authenticated & User;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
}