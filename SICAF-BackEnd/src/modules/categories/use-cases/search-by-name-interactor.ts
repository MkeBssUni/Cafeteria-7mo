import { UseCase } from "../../../kernel/contracts";
import { isValidName } from "../../../kernel/validations";
import { Category } from "../entities/category";
import { CategoriesRepository } from "./ports/categories-repository";

export class SearchByNameInteractor implements UseCase<String, Category[]>{
    constructor(private readonly categoryRepository: CategoriesRepository){}
    async execute(name: string): Promise<Category[]> {
        name.trim();
        name.toUpperCase();
        return this.categoryRepository.searchByName(name);
    }
}