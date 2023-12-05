import { GetUserByEmailDto } from '../adapters/dtos/get-user-by-email';
import { User } from '../entities/user';
import { UserRepository } from './ports/user.repository';
import { UseCase } from '../../../kernel/contracts';

export default class GetByEmailInteractor implements UseCase<GetUserByEmailDto, User> {
    constructor(private userRepository: UserRepository) { }
    async execute(payload: GetUserByEmailDto): Promise<User> {
        if (!payload || !payload.email) {
            throw new Error('Missing fields');
        }

        return this.userRepository.findByEmail(payload);
    }
}
