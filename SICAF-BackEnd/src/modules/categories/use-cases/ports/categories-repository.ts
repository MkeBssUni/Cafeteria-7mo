import { ChangeStatusCategoryDto } from "../../adapters/dto/change-status-category-dto";
import { CreateCategoryDto } from "../../adapters/dto/create-category-dto";
import { UpdateCategoryDto } from "../../adapters/dto/update-category-dto";
import { Category } from "../../entities/category";

export interface CategoriesRepository {
    createCategory(payload: CreateCategoryDto): Promise<Category>;
    getCategories():Promise<Category[]>;
    getCategoriesByStatus(status: string): Promise<Category[]>;
    existsCategoryById(id: number): Promise<boolean>;
    existsCategoryByName(name: string): Promise<boolean>;
    getCategoryById(id: number): Promise<Category>;
    changeStatusCategory(payload: ChangeStatusCategoryDto): Promise<Category>;
    updateCategory(payload: UpdateCategoryDto): Promise<Category>;
    searchByName(name: string): Promise<Category[]>;
}