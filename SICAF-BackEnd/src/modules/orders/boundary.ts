import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";
import { DiscountStorageGateway } from "../discounts/adapters/discount.storage.gateway";
import { UsersStorageGateway } from "../users/adapters/users-storage-gateway";

const ProductStorage = new ProductsStorageGateway();
const DiscountStorage = new DiscountStorageGateway();
const UserStorage = new UsersStorageGateway();

const existsUserById = UserStorage.existsById;
const findProductById = ProductStorage.findReceiptProductById;
const findDiscountById = DiscountStorage.findById;
const findUserById = UserStorage.findUserById;
const updateProductStock = ProductStorage.updateStock;

export {
    existsUserById,
    findProductById,
    findDiscountById,
    findUserById,
    updateProductStock
}