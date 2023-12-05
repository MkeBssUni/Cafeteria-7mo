import { UseCase } from '../../../kernel/contracts';
import { User } from "../entities/user";
import { UserRepository } from './ports/user.repository';

export class UpdateUserInteractor implements UseCase<User, User> {
    constructor(private userRepository: UserRepository) {}
  
    async execute(payload: User): Promise<User> {
      if (!payload?.email || !payload?.password) {
        throw new Error('Missing fields');
      }
  
      try {
        const updatedUser = await this.userRepository.updateUser(payload);
        return updatedUser;
      } catch (error) {
        console.error('Error updating user:', error);
        throw new Error(`Error updating user|| 'Unknown error'}`);
      }
    }
  }
