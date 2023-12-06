import { UseCase } from "../../../kernel/contracts";
import { User } from "../entity/user";
import { UsersRepository } from "./ports/users-repository";

export class GetUserInteractor implements UseCase<number,User>{
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(payload: number): Promise<User> {
        if(!payload) throw new Error('Missing fields');
        if(!await this.usersRepository.existsById(payload)) throw new Error('Not found');
        
        return await this.usersRepository.findById(payload);
    }
}