import { ProductsStorageGateway } from "../products/adapters/products-storage-gateway";

const ProductsStorage = new ProductsStorageGateway();

const findProductById = ProductsStorage.findById;

export{
    findProductById
}