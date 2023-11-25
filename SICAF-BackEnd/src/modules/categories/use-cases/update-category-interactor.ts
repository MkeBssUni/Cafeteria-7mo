import { UseCase } from "../../../kernel/contracts";
import { isValidName } from "../../../kernel/validations";
import { UpdateCategoryDto } from "../adapters/dto/update-category-dto";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class UpdateCategoryInteractor implements UseCase<UpdateCategoryDto, Category>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(payload: UpdateCategoryDto): Promise<Category> {
        payload.name = payload.name.trim();
        if(isNaN(payload.id)) throw Error ('Invalid id');
        if(!payload.id || !payload.name) throw Error ('Missing fields');
        if(!await this.categoryRepository.existsCategoryById(payload.id)) throw Error ('Not found');
        if(typeof payload.status !== 'boolean') throw Error ('Invalid status');
        if(!isValidName(payload.name)) throw Error ('Invalid name');
        if(await this.categoryRepository.existsCategoryByName(payload.name)) throw Error ('Already exists');
        return this.categoryRepository.updateCategory(payload);
    }
}