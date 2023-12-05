import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";
import { DiscountStorageGateway } from "../discounts/adapters/discount.storage.gateway";

const ProductStorage = new ProductsStorageGateway();
const DiscountStorage = new DiscountStorageGateway();

const findProductById = ProductStorage.findById;
const findDiscountById = DiscountStorage.findById;

export {
    findProductById,
    findDiscountById
}