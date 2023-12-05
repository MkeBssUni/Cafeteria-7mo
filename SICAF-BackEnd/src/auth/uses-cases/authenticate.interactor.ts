import { AuthRepository } from './port/auth.repository';
import { UseCase } from '../../kernel/contracts';
import { Authenticated } from "../adapters/dtos/authenticated.dto";
import { UserToAuth } from '../adapters/dtos/user.auth.dto';

export class AuthenticateInteractor implements UseCase<UserToAuth,Authenticated>{
    constructor(private authRepository: AuthRepository){}

    async execute(payload: UserToAuth) : Promise<Authenticated> {
        if(!payload.password || !payload.email) throw new Error("Missing fields");
        
        const auth: Authenticated = await this.authRepository.login(payload);
        if(!auth.token) throw new Error("Unauthorized");

        return auth;        
    }
}
