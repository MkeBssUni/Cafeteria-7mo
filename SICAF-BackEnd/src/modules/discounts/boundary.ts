import { CategoriesStorageGateway } from "../categories/adapters/categories-storage-gateway";
import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";
import { RoleStorageGateway } from "../roles/adapters/role.storage.gateway";
import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const CategoriesStorage = new CategoriesStorageGateway();
const ProductStorage = new ProductsStorageGateway();
const UsersStorage = new UsersStorageGateway();
const RoleStorage = new RoleStorageGateway();

const existsCategoryById= CategoriesStorage.existsCategoryById;
const findCategoryById = CategoriesStorage.getCategoryById;
const existsProductById = ProductStorage.existsProductById;
const findUserById = UsersStorage.findUserById;
const findProductById = ProductStorage.findById;
const findProductsIdByCategory = ProductStorage.getProductsIdByCategory;
const addDiscountToProduct = ProductStorage.addDiscount;
const existsRoleById = RoleStorage.existsById;
const findRoleById = RoleStorage.findById;
const updateRoleDiscount = RoleStorage.updateDiscount;
const findRoleByDiscount = RoleStorage.findByDiscount;
const findProductsByDiscount = ProductStorage.findByDiscount;
const findUserEmails = UsersStorage.getEmailsByRol;


export {
    existsCategoryById,
    findCategoryById,
    existsProductById,
    findUserById,
    findProductById,
    findProductsIdByCategory,
    addDiscountToProduct,
    existsRoleById,
    findRoleById,
    updateRoleDiscount,
    findRoleByDiscount,
    findProductsByDiscount,
    findUserEmails
}