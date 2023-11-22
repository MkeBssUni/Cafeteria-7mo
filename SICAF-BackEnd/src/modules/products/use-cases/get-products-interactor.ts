import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { ProductsRepository } from "./ports/products-repository";

export class GetProductsInteractor implements UseCase<void, GetProductWithCategoryDto[]>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(): Promise<GetProductWithCategoryDto[]> {
        return this.productsRepository.getProducts();
    }
}