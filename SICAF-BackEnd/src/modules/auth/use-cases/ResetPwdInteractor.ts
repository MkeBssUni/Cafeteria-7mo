import { UseCase } from "../../../kernel/contracts";
import { encodeString } from "../../../kernel/jwt";
import { GetUserDto, ResetPwdDto } from "../adapters/dto";
import { AuthRepository } from "./ports/auth.repository";

export class ResetPwdInteractor implements UseCase<ResetPwdDto, GetUserDto> {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(payload: ResetPwdDto): Promise<GetUserDto> {
        if (!payload.password) throw new Error('Missing fields');
        if (!payload.token) throw new Error('Invalid token');

        const resetToken: number = await this.authRepository.validateResetToken(payload.token);
        if (!resetToken) throw new Error('Invalid token');
        //validar contraseña

        return await this.authRepository.resetPassword({
            id: resetToken,
            password: await encodeString(payload.password),
        } as ResetPwdDto);
    }
}