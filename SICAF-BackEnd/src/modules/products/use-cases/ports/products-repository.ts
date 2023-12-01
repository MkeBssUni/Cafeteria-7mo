import { addDiscountDto } from "../../adapters/dto/addDiscountDto";
import { CreateProductDto } from "../../adapters/dto/create-product.dto";
import { GetProductWithCategoryDto } from "../../adapters/dto/get-product-dto";
import { UpdateProductDto } from "../../adapters/dto/update-product-dto";
import { Product } from "../../entities/product";

export interface ProductsRepository {
    findById: (id: number) => Promise<Product>
    createProduct: (payload: CreateProductDto) => Promise<Product>
    getProducts: () => Promise<GetProductWithCategoryDto[]>
    getProductsByStatus: (status: boolean) => Promise<GetProductWithCategoryDto[]>
    getProductsByCategory: (category_id: number) => Promise<GetProductWithCategoryDto[]>
    getProductsIdByCategory: (category_id: number) => Promise<number[]>
    updateProduct: (payload: UpdateProductDto) => Promise<Product>
    existsProductById: (id: number) => Promise<boolean>
    getProductById: (id: number) => Promise<GetProductWithCategoryDto>
    changeStatus: (id: number) => Promise<GetProductWithCategoryDto>
    searchByName: (name: string) => Promise<GetProductWithCategoryDto[]>
    addDiscount: (payload: addDiscountDto) => Promise<boolean>
}