import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { ProductsRepository } from "./ports/products-repository";

export class GetProductInteractor implements UseCase<number, GetProductWithCategoryDto>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(id: number): Promise<GetProductWithCategoryDto> {
        if(!id) throw Error ('Missing fields')
        if(isNaN(id)) throw Error ('Invalid id')
        if(!await this.productsRepository.existsProductById(id)) throw Error ('Not found')
        return this.productsRepository.getProductById(id);
    }
}