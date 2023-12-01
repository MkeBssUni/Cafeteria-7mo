import { UseCase } from "../../../kernel/contracts";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class GetCategoryByIdInteractor implements UseCase<number, Category>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(id: number): Promise<Category> {
        if(isNaN(id)) throw Error ('Invalid id');
        if(!await this.categoryRepository.existsCategoryById(id)) throw Error ('Not found');
        return this.categoryRepository.getCategoryById(id);
    }
}