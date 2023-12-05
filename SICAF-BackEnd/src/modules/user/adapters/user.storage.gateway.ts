import { SaveUser } from "./dtos/save-user";
import { User } from "../entities/user";
import { UserRepository } from "../use-case/ports/user.repository";
import { pool } from "../../../config/bdconfig";
import { GetUserByEmailDto } from "./dtos/get-user-by-email";
import { encode } from "../../../utils/bcrypt";
import bcrypt from 'bcrypt';


export default class UserGateway implements UserRepository {

    //guardar un usuario
    async save(payload: SaveUser): Promise<User> {
        const client = await pool.connect();
        try {
            const userExists = await client.query('SELECT * FROM users WHERE email = $1', [payload.email])
            if (userExists.rowCount > 0) {
                throw new Error("El email ya está en uso");
            }
            
            // Realizar el hash de la contraseña antes de guardarla en la base de datos
            const hashedPassword = await bcrypt.hash(payload.password, 10); // Aplicar hash a la contraseña con una sal de 10 rondas

            const query = await client.query(
                `INSERT INTO users (email, password, role_id, dark_theme, letter_size, status, created_at) 
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [payload.email, hashedPassword, payload.role_id, payload.dark_theme, payload.letter_size, payload.status, payload.created_at]
            );

            const result: User = query.rows[0];
            
            return result;
        } catch (error) {            
            throw error;
        } finally {
            client.release();
        }
    }

    //encontrar un usuario por su email
    async findByEmail(payload: GetUserByEmailDto): Promise<User> {
        const client = await pool.connect();
        try {
            const query = await client.query(`SELECT * FROM users WHERE email = $1`, [payload.email]);
            const result = (query).rows[0] as User;

            if (!result) throw new Error('No match')

            return result;
        } catch (error) {
            throw error;
        }finally{
            client.release();
        }
    }

    //actualizar la informacion del usuario
    async updateUser(payload: User): Promise<User> {
        const client = await pool.connect();
        try {
            //console.log(payload)
            const UserExists = await client.query('SELECT * FROM users WHERE email = $1 AND NOT id=$2', [payload.email, payload.id])
            if(UserExists.rowCount > 0) throw new Error("User occupied");
            
            const EmailExists = await client.query('SELECT * FROM users WHERE email = $1 AND NOT id=$2', [payload.email, payload.id])
            if(EmailExists.rowCount > 0) throw new Error("Email occupied");

            const query = await client.query(`UPDATE users SET email = $1, password = $2, role_id = $3, 
                dark_theme = $4, letter_size = $5, status = $6, created_at = $7 WHERE id = $8 RETURNING *`,
                [payload.email, payload.password, payload.role_id, payload.dark_theme, payload.letter_size, payload.status, payload.created_at, payload.id]);

            const result = (query).rows[0];

            if (!result) throw new Error('Not found')
            return result;
        } catch (error) {
            throw error;
        }finally{
            client.release();
        }
    }

    async getUsers(): Promise<User[]> {
        const client = await pool.connect();
        try{
            const query = await client.query(`SELECT * FROM users`);
            const result = (query).rows as User[];

            return result;
        }catch(error){
            throw error;
        }finally{
            client.release();
        }
    }


    async changeUserStatus(payload: User): Promise<User> {
        const client = await pool.connect();
        try {
            const query = await client.query(
                `UPDATE users SET status = $1 WHERE id = $2 RETURNING *`,
                [payload.status, payload.id]
            );
    
            const result = query.rows[0] as User;
    
            if (!result) throw new Error('Not found');
            return result;
        } catch (error) {
            throw error;
        } finally {
            client.release();
        }
    }
}