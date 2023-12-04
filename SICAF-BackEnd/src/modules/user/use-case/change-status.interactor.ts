import { UserRepository } from './ports/user.repository';
import { User } from '../entities/user';
import { UseCase } from '../../../kernel/contracts';

export class ChangeStatus implements UseCase<User,User>{
    constructor(private userRepository : UserRepository) { }
    execute(payload: User): Promise<User> {
        return this.userRepository.changeUserStatus(payload);
    }
}