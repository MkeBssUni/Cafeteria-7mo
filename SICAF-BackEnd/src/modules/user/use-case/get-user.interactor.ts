import { UseCase } from '../../../kernel/contracts';
import { User } from "../entities/user";
import { UserRepository } from "./ports/user.repository";

export class GetUsersInteractor implements UseCase<null,User[]>{
    constructor(private repository: UserRepository) { }
    
    execute(payload: null): Promise<User[]> {
        const response =  this.repository.getUsers();
        return response;
    }
}