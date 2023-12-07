import { UseCase } from "../../../kernel/contracts";
import { sendForgotPasswordEmail } from "../../../kernel/functions";
import { generateRandomString } from "../../../kernel/jwt";
import { validateEmail } from "../../../kernel/validations";
import { User } from "../../users/entity/user";
import { ResetPwdDto, ResetTokenDto } from "../adapters/dto";
import { findUserByEmail } from "../boundary";
import { AuthRepository } from "./ports/auth.repository";

export class ResetTokenInteractor implements UseCase<ResetTokenDto, boolean> {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(payload: ResetTokenDto): Promise<boolean> {
        if (!payload.email) throw new Error('Missing fields');
        if (!validateEmail(payload.email)) throw new Error('Invalid email');
        
        payload.path = payload.path.charAt(0) === '/' ? payload.path.slice(1) : payload.path;
        payload.email = payload.email.toLowerCase().trim();
        
        const user = await findUserByEmail(payload.email) as User;
        if (!user) throw new Error('Not found');

        const token = generateRandomString();
        console.log(token)
        const url = `${payload.origin}/${payload.path}/${token}`;
        
        const responseEmail = sendForgotPasswordEmail({email: user.email, url: url});
        if (!responseEmail) throw new Error('Error sending email');

        return await this.authRepository.generateResetToken({id: user.user_id, token: token} as ResetPwdDto);
    }
}