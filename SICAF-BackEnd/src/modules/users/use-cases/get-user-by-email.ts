import { UseCase } from "../../../kernel/contracts";
import { isValidEmail } from "../../../kernel/validations";
import { User } from "../entity/user";
import { UsersRepository } from "./ports/users-repository";

export class GetUserByEmailInteractor implements UseCase<string,User>{
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(email: string): Promise<User> {
        if(!email) throw new Error('Missing fields');
        if(!isValidEmail(email)) throw new Error('Invalid email');
        if(!await this.usersRepository.existsByEmail(email)) throw new Error('Not found');
        
        return await this.usersRepository.findByEmail(email);
    }
}