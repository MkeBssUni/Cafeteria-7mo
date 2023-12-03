import { Provider } from "../../entities/provider"

export interface ProvidersRepository {
    create(provider: Provider): Promise<Provider>
    update(provider: Provider): Promise<Provider>
    getAll(): Promise<Provider[]>
    findById(id: number): Promise<Provider>
    changeStatus(id: number): Promise<Provider>
    existsByName(name: String): Promise<boolean>
    existsByEmail(email: String): Promise<boolean>
}