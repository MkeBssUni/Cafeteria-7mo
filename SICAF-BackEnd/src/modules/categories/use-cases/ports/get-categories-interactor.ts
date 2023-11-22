import { UseCase } from "../../../../kernel/contracts";
import { Category } from "../../entities/category";
import { CategoriesRepository } from "./categories-repository";

export class GetCategoriesInteractor implements UseCase<void, Category[]>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(): Promise<Category[]> {
        return this.categoryRepository.getCategories();
    }
}