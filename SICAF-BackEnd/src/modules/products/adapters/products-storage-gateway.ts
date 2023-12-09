import { pool } from "../../../config/bdconfig";
import { CreateProductDto } from "./dto/create-product.dto";
import { Product } from "../entities/product";
import { ProductsRepository } from "../use-cases/ports/products-repository";
import { GetProductWithCategoryDto } from "./dto/get-product-dto";
import { UpdateProductDto } from "./dto/update-product-dto";
import { addDiscountDto } from "./dto/addDiscountDto";
import { GetProductsByCategoryAndStatusDto } from "./dto/get-products-by-category-and-status-dto";
import { UpdateStockDto } from "./dto/UpdateStockDto";
import { GetReceiptProductDto } from "./dto/GetReceiptProductDto";

export class ProductsStorageGateway implements ProductsRepository{

    async findById(id: number): Promise<Product> {
        try {
            const response = await pool.query("select * from products where id = $1", [id]);
            return response.rows[0] as Product;
        } catch (error) {
            throw Error
        }
    }

    async findProductWithCategoryById(id: number): Promise<GetProductWithCategoryDto> {
        try {
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where p.id = $1;", [id]);
            const product: GetProductWithCategoryDto = {
                id: response.rows[0].id,
                name: response.rows[0].name,
                status: response.rows[0].status,
                description: response.rows[0].description,
                image: response.rows[0].image,
                price: response.rows[0].price,
                stock: response.rows[0].stock,
                category:{
                    category_id: response.rows[0].category_id,
                    category_name: response.rows[0].category_name
                },
                provider_id: response.rows[0].provider_id,
                discount_id: response.rows[0].discount_id,
                created_at: response.rows[0].created_at,
            }
            return product;
        } catch (error) {
            throw Error
        }
    }

    async createProduct(payload: CreateProductDto): Promise<Product> {
        try {
            const response = await pool.query("INSERT INTO PRODUCTS (name, description, image, price, stock, status, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [payload.name, payload.description, payload.image, payload.price, payload.stock, payload.status ,payload.category_id]);
            return response.rows[0];
        } catch (error) {
            console.log("error: ", error)
            throw Error
        }
    }

    async getProducts(): Promise<GetProductWithCategoryDto[]> {
        try {
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id;");
            const products: GetProductWithCategoryDto[] = response.rows.map((product: any) => {
                return {
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    status: product.status,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                    category:{
                        category_id: product.category_id,
                        category_name: product.category_name
                    },
                    provider_id: product.provider_id,
                    discount_id: product.discount_id,
                    created_at: product.created_at,
                }
            })
            return products;
        } catch (error) {
            throw Error
        }
    }

    async getProductsByCategory(category_id: number): Promise<GetProductWithCategoryDto[]> {
        try {
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where category_id = $1;", [category_id]);
            const products: GetProductWithCategoryDto[] = response.rows.map((product: any) => {
                return {
                    id: product.id,
                    name: product.name,
                    status: product.status,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                    category:{
                        category_id: product.category_id,
                        category_name: product.category_name
                    },
                    provider_id: product.provider_id,
                    discount_id: product.discount_id,
                    created_at: product.created_at,
                }
            })
            return products;
        } catch (error) {
         throw Error   
        }
    }

    async getProductsIdByCategory(category_id: number): Promise<number[]> {
        try {
            const response = await pool.query("select id from products where category_id = $1;", [category_id]);
            return response.rows.map((row) => row.id);
        } catch (error) {
            throw Error
        }
    }

    async updateProduct(payload: UpdateProductDto): Promise<Product>{
        try {
            const response = await pool.query("UPDATE PRODUCTS SET name = $1, description = $2, image = $3, price = $4, stock = $5, category_id = $6, discount_id = $7, provider_id = $8 WHERE id = $9 RETURNING *", [payload.name, payload.description, payload.image, payload.price, payload.stock, payload.category_id, payload.discount_id, payload.provider_id, payload.id]);
            return response.rows[0];
        } catch (error) {
            throw Error
        }
    }

    async existsProductById(id: number): Promise<boolean> {
        try {
            const response = await pool.query("SELECT EXISTS(SELECT 1 FROM PRODUCTS WHERE id = $1)", [id]);
            return response.rows[0].exists;
        } catch (error) {
            throw Error
        }
    }

    async getProductsByStatus(status: boolean): Promise<GetProductWithCategoryDto[]> {
        try {
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where p.status = $1;", [status]);
            const products: GetProductWithCategoryDto[] = response.rows.map((product: any) => {
                return {
                    id: product.id,
                    name: product.name,
                    status: product.status,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                    category:{
                        category_id: product.category_id,
                        category_name: product.category_name
                    },
                    provider_id: product.provider_id,
                    discount_id: product.discount_id,
                    created_at: product.created_at,
                }
            })
            return products;
        } catch (error) {
            throw Error
        }
    }

    async getProductById(id:number): Promise<GetProductWithCategoryDto>{
        try {
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where p.id = $1;", [id]);
            const product: GetProductWithCategoryDto = {
                id: response.rows[0].id,
                name: response.rows[0].name,
                status: response.rows[0].status,
                description: response.rows[0].description,
                image: response.rows[0].image,
                price: response.rows[0].price,
                stock: response.rows[0].stock,
                category:{
                    category_id: response.rows[0].category_id,
                    category_name: response.rows[0].category_name
                },
                provider_id: response.rows[0].provider_id,
                discount_id: response.rows[0].discount_id,
                created_at: response.rows[0].created_at,
            }
            return product;
        } catch (error) {
            throw Error
        }
    }

    async changeStatus(id: number): Promise<GetProductWithCategoryDto>{
        try {
            const product = await this.getProductById(id);
            const response = await pool.query("UPDATE PRODUCTS SET status = $1 WHERE id = $2 RETURNING *", [!product.status, id]);
            const productUpdated: GetProductWithCategoryDto = {
                id: response.rows[0].id,
                name: response.rows[0].name,
                status: response.rows[0].status,
                description: response.rows[0].description,
                image: response.rows[0].image,
                price: response.rows[0].price,
                stock: response.rows[0].stock,
                category:{
                    category_id: response.rows[0].category_id,
                    category_name: response.rows[0].category_name
                },
                provider_id: response.rows[0].provider_id,
                discount_id: response.rows[0].discount_id,
                created_at: response.rows[0].created_at,
            }
            return productUpdated;
        } catch (error) {
            throw Error
        }
    }

    async searchByName(name: string): Promise<GetProductWithCategoryDto[]>{
        try {
            console.log("Esto sigue pendiente")
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where p.name like UPPER('%' || $1 || '%');",[name])
            const products: GetProductWithCategoryDto[] = response.rows.map((product: any) => {
                return {
                    id: product.id,
                    name: product.name,
                    status: product.status,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                    category:{
                        category_id: product.category_id,
                        category_name: product.category_name
                    },
                    provider_id: product.provider_id,
                    discount_id: product.discount_id,
                    created_at: product.created_at,
                }
            })
            return products;
        } catch (error) {
            throw Error
            
        }
    }

    async addDiscount(payload: addDiscountDto): Promise<boolean> {
        const { product_id, discount_id } = payload;
        try {
            const response = await pool.query("update products set discount_id = $2 where id = $1", [product_id, discount_id]);
            return true;
        } catch (error) {
            throw Error
        }
    }

    async getProductsByCategoryAndStatus(payload: GetProductsByCategoryAndStatusDto): Promise<GetProductWithCategoryDto[]> {
        try {
            const response = await pool.query("select p.*, c.name as category_name from products p inner join categories c on p.category_id = c.id where category_id = $1 and p.status = $2;", [payload.category_id, payload.status]);
            const products: GetProductWithCategoryDto[] = response.rows.map((product: any) => {
                return {
                    id: product.id,
                    name: product.name,
                    status: product.status,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    stock: product.stock,
                    category:{
                        category_id: product.category_id,
                        category_name: product.category_name
                    },
                    provider_id: product.provider_id,
                    discount_id: product.discount_id,
                    created_at: product.created_at,
                }
            })
            return products;
        } catch (error) {
            throw Error
        }
    }

    async updateStock(payload: UpdateStockDto): Promise<boolean> {
        try {
            const { id, stock } = payload;
            await pool.query("update products set stock = $2 where id = $1", [id, stock]);
            return true;
        } catch (e) {
            throw Error
        }
    }

    async findReceiptProductById(id: number): Promise<GetReceiptProductDto> {
        try {
            const response = await pool.query("select p.id, c.name as category, p.name, p.price, p.discount_id as discount, p.stock, p.status from products p inner join categories c on p.category_id = c.id where p.id = $1;", [id]);
            return response.rows[0] as GetReceiptProductDto;
        } catch (e) {
            throw Error
        }
    }

}