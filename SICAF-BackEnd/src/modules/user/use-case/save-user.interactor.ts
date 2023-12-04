import { UserRepository } from './ports/user.repository';
import { User } from './../entities/user';
import { UseCase } from '../../../kernel/contracts';
import { SaveUser } from "../adapters/dtos/save-user";

export default class SaveUserInteractor implements UseCase<SaveUser, User>{
    constructor(private UserRepository: UserRepository) { }
    execute(payload: SaveUser): Promise<User> {
        if (!payload.email || !payload.password || !payload.role_id || !payload.dark_theme || !payload.letter_size || !payload.status || !payload.created_at) throw new Error("Missing fields");

        return this.UserRepository.save(payload)
    }
}
