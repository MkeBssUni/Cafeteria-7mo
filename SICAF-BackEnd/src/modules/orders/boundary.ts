import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";
import { DiscountStorageGateway } from "../discounts/adapters/discount.storage.gateway";
import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const ProductStorage = new ProductsStorageGateway();
const DiscountStorage = new DiscountStorageGateway();
const UsersStorage = new UsersStorageGateway();

const findUserById = UsersStorage.findUserInfoById;
const findProductById = ProductStorage.findProductWithCategoryById;
const findDiscountById = DiscountStorage.findById;
const updateProductStock = ProductStorage.updateStock;

export {
    findUserById,
    findProductById,
    findDiscountById,
    updateProductStock
}