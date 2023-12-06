import { GetUserDto, LoginDto, ResetPwdDto } from "../../adapters/dto";

export interface AuthRepository {
    login(payload: LoginDto): Promise<GetUserDto>;
    generateResetToken(payload: ResetPwdDto): Promise<boolean>;
    validateResetToken(token: string): Promise<number>;
    resetPassword(payload: ResetPwdDto): Promise<GetUserDto>;
}