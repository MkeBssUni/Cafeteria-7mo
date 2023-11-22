import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { existsCategoryById } from "../boundary";
import { ProductsRepository } from "./ports/products-repository";

export class GetProductsByCategoryInteractor implements UseCase<number, GetProductWithCategoryDto[]>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(category_id: number): Promise<GetProductWithCategoryDto[]> {
        if(!category_id) throw Error ('Missing fields')
        if(isNaN(category_id)) throw Error ('Invalid id')
        if(!await existsCategoryById(category_id)) throw Error ('Category not found')
        return this.productsRepository.getProductsByCategory(category_id);
    }
}