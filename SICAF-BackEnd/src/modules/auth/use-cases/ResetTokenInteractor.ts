import { UseCase } from "../../../kernel/contracts";
import { generateRandomString } from "../../../kernel/jwt";
import { validateEmail } from "../../../kernel/validations";
import { ResetPwdDto, ResetTokenDto } from "../adapters/dto";
import { AuthRepository } from "./ports/auth.repository";

export class ResetTokenInteractor implements UseCase<ResetTokenDto, boolean> {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(payload: ResetTokenDto): Promise<boolean> {
        if (!payload.email) throw new Error('Missing fields');
        if (!validateEmail(payload.email)) throw new Error('Invalid email');
        payload.path = payload.path.charAt(0) === '/' ? payload.path.slice(1) : payload.path;
        payload.email = payload.email.toLowerCase().trim();
        //validar que exista el usuario

        const token = generateRandomString();
        const url = `${payload.origin}/${payload.path}/${token}`;

        //enviar correo

        return await this.authRepository.generateResetToken({id: 1, token: token} as ResetPwdDto);
    }
}