import { UseCase } from "../../../kernel/contracts";
import { ChangeStatusCategoryDto } from "../adapters/dto/change-status-category-dto";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class ChangeStatusInteractor implements UseCase<ChangeStatusCategoryDto, Category>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(payload: ChangeStatusCategoryDto): Promise<Category> {
        if(isNaN(payload.id)) throw Error ('Invalid id');
        if(!payload.id || !payload.status) throw Error ('Missing fields');
        if(!await this.categoryRepository.existsCategoryById(payload.id)) throw Error ('Not found');
        if(payload.status!== 'true' && payload.status !== 'false') throw Error ('Invalid status');
        return this.categoryRepository.changeStatusCategory(payload);
    }
}