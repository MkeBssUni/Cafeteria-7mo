import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { ProductsRepository } from "./ports/products-repository";

export class GetProductsByStatusInteractor implements UseCase<boolean, GetProductWithCategoryDto[]>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(status: boolean): Promise<GetProductWithCategoryDto[]> {
        if(typeof status !== 'boolean') throw Error ('Invalid status')
        return this.productsRepository.getProductsByStatus(status);
    }
}