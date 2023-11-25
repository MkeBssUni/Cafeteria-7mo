import { pool } from "../../../config/bdconfig";
import { Category } from "../entities/category";
import { CategoriesRepository } from "../use-cases/ports/categories-repository";
import { CreateCategoryDto } from "./dto/create-category-dto";
import { UpdateCategoryDto } from "./dto/update-category-dto";

export class CategoriesStorageGateway implements CategoriesRepository{
    
    async createCategory(payload: CreateCategoryDto): Promise<Category> {
        try {
            const response = await pool.query("INSERT INTO CATEGORIES (name) values ($1) RETURNING *",[payload.name]);
            return response.rows[0];
        } catch (error) {
            throw Error
        }
    }

    async getCategories(): Promise<Category[]> {
        try {
            const response = await pool.query("SELECT * FROM CATEGORIES;")
            return response.rows;   
        } catch (error) {
            throw Error
        }
    }

    async getCategoriesByStatus(status: boolean): Promise<Category[]> {
        try {
            const response = await pool.query("SELECT * FROM CATEGORIES WHERE status = $1;",[status])
            return response.rows;   
        } catch (error) {
            console.log("error: ", error)
            throw Error
        }
    }

    async existsCategoryById(id: number): Promise<boolean> {
        try {
            const response = await pool.query("SELECT EXISTS(SELECT 1 FROM CATEGORIES WHERE id = $1);",[id])
            return response.rows[0].exists;   
        } catch (error) {
            throw Error
        }
    }

    async existsCategoryByName(name: string): Promise<boolean> {
        try {
            const response = await pool.query("SELECT EXISTS(SELECT 1 FROM CATEGORIES WHERE UPPER(name) = $1);;",[name.toUpperCase()])
            return response.rows[0].exists;   
        } catch (error) {
            throw Error
        }
    }

    async getCategoryById(id: number): Promise<Category> {
        try {
            const response = await pool.query("SELECT * FROM CATEGORIES WHERE id = $1;",[id])
            return response.rows[0];   
        } catch (error) {
            throw Error
        }
    }

    async changeStatusCategory(id: number): Promise<Category> {
        try {
            const category = await this.getCategoryById(id);
            const response = await pool.query("UPDATE CATEGORIES SET status = $1 WHERE id = $2 RETURNING *;",[!category.status, id])
            return response.rows[0];   
        } catch (error) {
            throw Error
        }
    }

    async updateCategory(payload: UpdateCategoryDto): Promise<Category> {
        try {
            const response = await pool.query("UPDATE CATEGORIES SET name = $1, status =$2 WHERE id = $3 RETURNING *;",[payload.name, payload.status, payload.id])
            return response.rows[0];   
        } catch (error) {
            throw Error
        }
    }

    async searchByName(name: string): Promise<Category[]> {
        try {
            const response = await pool.query("SELECT * FROM CATEGORIES WHERE UPPER(name) LIKE UPPER('%' || $1 || '%');",[name])
            return response.rows;   
        } catch (error) {
            throw Error
        }    
    }
}