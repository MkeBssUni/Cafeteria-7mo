import { UseCase } from "../../../kernel/contracts";
import { User } from "../entity/user";
import { UsersRepository } from "./ports/users-repository";

export class GetUsersByStatusInteractor implements UseCase<boolean, User[]>{
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute(status: boolean): Promise<User[]> {
        console.log(status)
        if(typeof status != 'boolean') throw Error ('Invalid status')
        
        return this.usersRepository.findByStatus(status);
    }
}