import { Authenticated } from "../../adapters/dtos/authenticated.dto";
import { UserToAuth } from "../../adapters/dtos/user.auth.dto";
import { User } from "../../../modules/user/entities/user";

export interface AuthRepository {
    login(payload: UserToAuth): Promise<Authenticated & User>;
}