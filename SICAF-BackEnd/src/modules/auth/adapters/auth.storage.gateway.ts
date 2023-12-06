import { pool } from "../../../config/bdconfig";
import { AuthRepository } from "../use-cases/ports/auth.repository";
import { LoginDto, GetUserDto, ResetPwdDto } from "./dto";

export class AuthStorageGateway implements AuthRepository {
    async login(payload: LoginDto): Promise<GetUserDto> {
        try {
            const response = await pool.query('select u.id, u.email, u.password, r.name as role, u.dark_theme, u.letter_size, u.status from users u inner join roles r on u.role_id = r.id where u.email = $1', [payload.email]);
            return response.rows[0];
        } catch (e) {
            throw Error;
        }
    }

    async generateResetToken(payload: ResetPwdDto): Promise<boolean> {
        try {
            const response = await pool.query('update users set reset_token = $2 where id = $1', [payload.id, payload.token]);
            return response.rows[0] > 0;
        } catch (e) {
            throw Error;
        }
    }

    async validateResetToken(token: string): Promise<number> {
        try {
            const response = await pool.query('select id from users where reset_token = $1', [token]);
            return response.rows[0].id;
        } catch (e) {
            throw Error;
        }
    }

    async resetPassword(payload: ResetPwdDto): Promise<GetUserDto> {
        try {
            const response = await pool.query('update users set password = $2, reset_token = null where id = $1 returning *', [payload.id, payload.password]);
            return response.rows[0] as GetUserDto;
        } catch (e) {
            throw Error;
        }
    }
}