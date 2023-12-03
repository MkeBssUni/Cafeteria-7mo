import { UpdateProviderDto } from "../../adapters/dto/upadte-provider-dto"
import { Provider } from "../../entities/provider"

export interface ProvidersRepository {
    create(provider: Provider): Promise<Provider>
    update(provider: UpdateProviderDto): Promise<Provider>
    getAll(): Promise<Provider[]>
    findById(id: number): Promise<Provider>
    changeStatus(id: number): Promise<Provider>
    existsByName(name: String): Promise<boolean>
    existsByEmail(email: String): Promise<boolean>
    existsById(id: number): Promise<boolean>
}