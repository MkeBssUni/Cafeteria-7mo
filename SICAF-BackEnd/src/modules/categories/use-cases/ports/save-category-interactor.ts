import { UseCase } from "../../../../kernel/contracts";
import { isValidName } from "../../../../kernel/validations";
import { CreateCategoryDto } from "../../adapters/dto/create-category-dto";
import { Category } from "../../entities/category";
import { CategoriesRepository } from "./categories-repository";

export class SaveCategoryInteractor implements UseCase<CreateCategoryDto, Category>{
    constructor (private readonly categoryRepository: CategoriesRepository){}
    async execute(payload: CreateCategoryDto): Promise<Category> {
        payload.name = payload.name.trim();
        if(!payload.name) throw Error ('Missing fields')
        if(!isValidName(payload.name)) throw Error ('Invalid name')
        if(await this.categoryRepository.existsCategoryByName(payload.name)) throw Error ('Already exists')
        return this.categoryRepository.createCategory(payload)
    }
}