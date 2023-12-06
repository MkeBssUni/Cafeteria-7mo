import { GetUserDto, LoginDto } from "../../adapters/dto";

export interface AuthRepository {
    login(payload: LoginDto): Promise<GetUserDto>;
}