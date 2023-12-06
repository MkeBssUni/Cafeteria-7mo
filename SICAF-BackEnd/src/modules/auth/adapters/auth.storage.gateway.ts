import { pool } from "../../../config/bdconfig";
import { AuthRepository } from "../use-cases/ports/auth.repository";
import { LoginDto, GetUserDto } from "./dto";

export class AuthStorageGateway implements AuthRepository {
    async login(payload: LoginDto): Promise<GetUserDto> {
        try {
            const response = await pool.query('select u.id, u.email, u.password, r.name as role, u.dark_theme, u.letter_size, u.status from users u inner join roles r on u.role_id = r.id where u.email = $1', [payload.email]);
            return response.rows[0];
        } catch (e) {
            throw Error;
        }
    }
}