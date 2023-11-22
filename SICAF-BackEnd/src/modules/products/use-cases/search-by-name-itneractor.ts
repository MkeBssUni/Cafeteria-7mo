import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { ProductsRepository } from "./ports/products-repository";

export class SearchByNameInteractor implements UseCase<string, GetProductWithCategoryDto[]>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(name: string): Promise<GetProductWithCategoryDto[]> {
        name.trim();
        name.toUpperCase();
        return this.productsRepository.searchByName(name);
    }
}