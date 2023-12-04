import { UseCase } from "../../../kernel/contracts";
import { Provider } from "../entities/provider";
import { ProvidersRepository } from "./ports/providers-repository";

export class GetProviderByIdInteractor implements UseCase<number, Provider>{
        constructor(private readonly providerRepository: ProvidersRepository){}
        async execute(id: number): Promise<Provider> {
            if(!await this.providerRepository.existsById(id)) throw new Error("Not found")
            return await this.providerRepository.findById(id);
        }
}
    