import { UseCase } from "../../../kernel/contracts";
import { compareEncrypt } from "../../../kernel/jwt";
import { validateEmail } from "../../../kernel/validations";
import { GetUserDto, LoginDto } from "../adapters/dto";
import { AuthRepository } from "./ports/auth.repository";

export class LoginInteractor implements UseCase<LoginDto, GetUserDto> {
    constructor(private readonly authRepository: AuthRepository) {}

    async execute(payload: LoginDto): Promise<GetUserDto> {
        if (!payload.email || !payload.password) throw new Error("Missing fields");
        if (!validateEmail(payload.email)) throw new Error("Invalid email");
        payload.email = payload.email.trim().toLowerCase();
        const user: GetUserDto = await this.authRepository.login(payload);
        if (!user) throw new Error("Incorrect credentials");
        //if (!await compareEncrypt(payload.password, user.password!)) throw new Error("Incorrect credentials");
        if (!user.status) throw new Error("Forbidden");
        return { ...user, password: undefined } as GetUserDto;
    }
}