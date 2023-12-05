import { UseCase } from "../../../kernel/contracts";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class ChangeStatusInteractor implements UseCase<number, Category>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(id: number): Promise<Category> {
        if(isNaN(id)) throw Error ('Invalid id');
        if(!id) throw Error ('Missing fields');
        if(!await this.categoryRepository.existsCategoryById(id)) throw Error ('Not found');
        return this.categoryRepository.changeStatusCategory(id);
    }
}