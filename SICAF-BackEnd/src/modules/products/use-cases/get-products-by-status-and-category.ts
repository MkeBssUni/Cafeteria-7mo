import { UseCase } from "../../../kernel/contracts";
import { GetProductWithCategoryDto } from "../adapters/dto/get-product-dto";
import { GetProductsByCategoryAndStatusDto } from "../adapters/dto/get-products-by-category-and-status-dto";
import { existsCategoryById } from "../boundary";
import { ProductsRepository } from "./ports/products-repository";

export class GetProductsByStatusAndCategoryInteractor implements UseCase<GetProductsByCategoryAndStatusDto, GetProductWithCategoryDto[]>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(payload: GetProductsByCategoryAndStatusDto): Promise<GetProductWithCategoryDto[]> {
        if(typeof payload.status !== 'boolean') throw Error ('Invalid status')
        if(typeof payload.category_id !== 'number') throw Error ('Invalid id')
        if(!await existsCategoryById(payload.category_id)) throw Error ('Category not found')
        return this.productsRepository.getProductsByCategoryAndStatus(payload);
    }
}