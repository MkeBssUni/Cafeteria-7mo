import { UpdateUserDto } from "../../adapters/dto/update-user-dto";
import { User } from "../../entity/user";

export interface UsersRepository {
    create(payload: User): Promise<User>;
    findAll(): Promise<User[]>;
    findByStatus(status: boolean): Promise<User[]>;
    findById(id: number): Promise<User>;
    findByEmail(email: string): Promise<User>;
    existsByEmail(email: string): Promise<boolean>;
    existsById(id: number): Promise<boolean>;
    update(payload: UpdateUserDto): Promise<User>;
    changeStatus(id: number): Promise<User>;
    //pendiente changePassword

}