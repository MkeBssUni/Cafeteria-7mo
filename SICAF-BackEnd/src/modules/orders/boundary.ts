import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";
import { DiscountStorageGateway } from "../discounts/adapters/discount.storage.gateway";
import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const ProductStorage = new ProductsStorageGateway();
const DiscountStorage = new DiscountStorageGateway();
const UsersStorage = new UsersStorageGateway();

const existsUserByIdAndRole = UsersStorage.existsByIdAndRole;
const findProductById = ProductStorage.findById;
const findDiscountById = DiscountStorage.findById;
const updateProductStock = ProductStorage.updateStock;

export {
    existsUserByIdAndRole,
    findProductById,
    findDiscountById,
    updateProductStock
}