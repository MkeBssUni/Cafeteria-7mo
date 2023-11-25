import { UseCase } from "../../../kernel/contracts";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class GetCategoriesByStatusInteractor implements UseCase<boolean, Category[]>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(status: boolean): Promise<Category[]> {
        if(typeof status != 'boolean') throw Error ('Invalid status')
        return this.categoryRepository.getCategoriesByStatus(status);
    }
}