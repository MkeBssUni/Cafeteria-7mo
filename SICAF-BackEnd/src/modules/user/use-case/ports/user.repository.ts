import { SaveUser } from "../../adapters/dtos/save-user";
import { GetUserByEmailDto } from "../../adapters/dtos/get-user-by-email";
import { User } from "../../entities/user";

export interface UserRepository {
    save(payload: SaveUser): Promise<User>;
    findByEmail(payload: GetUserByEmailDto): Promise<User>;
    updateUser(payload: User): Promise<User>;
    getUsers(): Promise<User[]>;
    changeUserStatus(payload: User): Promise<User>;
}