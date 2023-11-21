import { UseCase } from "../../../kernel/contracts";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class GetCategoriesByStatusInteractor implements UseCase<string, Category[]>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(status: string): Promise<Category[]> {
        if(status!== 'true' && status !== 'false') throw Error ('Invalid status');
        return this.categoryRepository.getCategoriesByStatus(status);
    }
}