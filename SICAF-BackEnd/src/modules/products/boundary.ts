import { CategoriesStorageGateway } from "../categories/adapters/categories-storage-gateway";

const CategoriesStorage = new CategoriesStorageGateway();

const existsCategoryById= CategoriesStorage.existsCategoryById;

export{
    existsCategoryById
}