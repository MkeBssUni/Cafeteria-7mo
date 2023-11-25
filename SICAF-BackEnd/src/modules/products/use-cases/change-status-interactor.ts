import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { ProductsRepository } from "./ports/products-repository";

export class ChangeStatusInteractor implements UseCase<number, GetProductWithCategoryDto>{
    constructor(private readonly productRepository: ProductsRepository){}
    async execute(id: number): Promise<GetProductWithCategoryDto> {
        if(isNaN(id)) throw Error ('Invalid id');
        if(!id) throw Error ('Missing fields');
        if(!await this.productRepository.existsProductById(id)) throw Error ('Not found');
        return this.productRepository.changeStatus(id);
    }
}