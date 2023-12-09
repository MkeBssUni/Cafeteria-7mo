import { CategoriesStorageGateway } from "../categories/adapters/categories-storage-gateway";
import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";
import { RoleStorageGateway } from "../roles/adapters/role.storage.gateway";
import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const CategoriesStorage = new CategoriesStorageGateway();
const ProductStorage = new ProductsStorageGateway();
const UsersStorage = new UsersStorageGateway();
const RoleStorage = new RoleStorageGateway();

const existsCategoryById= CategoriesStorage.existsCategoryById;
const existsProductById = ProductStorage.existsProductById;
const findUserById = UsersStorage.findUserById;
const findProductById = ProductStorage.findById;
const findProductsIdByCategory = ProductStorage.getProductsIdByCategory;
const addDiscountToProduct = ProductStorage.addDiscount;
const findRoleById = RoleStorage.findById;
const updateRoleDiscount = RoleStorage.updateDiscount;

export {
    existsCategoryById,
    existsProductById,
    findUserById,
    findProductById,
    findProductsIdByCategory,
    addDiscountToProduct,
    findRoleById,
    updateRoleDiscount
}