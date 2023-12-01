import { CategoriesStorageGateway } from "../categories/adapters/categories-storage-gateway";
import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";

const CategoriesStorage = new CategoriesStorageGateway();
const ProductStorage = new ProductsStorageGateway();

const existsCategoryById= CategoriesStorage.existsCategoryById;
const existsProductById = ProductStorage.existsProductById;
const getProductsIdByCategory = ProductStorage.getProductsIdByCategory;
const addDiscountToProduct = ProductStorage.addDiscount;

export {
    existsCategoryById,
    existsProductById,
    getProductsIdByCategory,
    addDiscountToProduct
}