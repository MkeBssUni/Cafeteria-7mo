import { UseCase } from "../../../kernel/contracts";
import { Provider } from "../entities/provider";
import { ProvidersRepository } from "./ports/providers-repository";

export class ChangeStatusProviderInteractor implements UseCase<number, Provider>{
    constructor(private readonly repository: ProvidersRepository){}
    async execute(input: number): Promise<Provider> {
        if(!input) throw Error("Missing fields")
        if(!await this.repository.existsById(input)) throw Error("Not found")
        return this.repository.changeStatus(input)
    }
}