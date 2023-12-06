import { UseCase } from "../../../kernel/contracts";
import { isValidName } from "../../../kernel/validations";
import { CreateProductDto } from "../adapters/dto/create-product.dto";
import { existsCategoryById } from "../boundary";
import { Product } from "../entities/product";
import { ProductsRepository } from "./ports/products-repository";

export class CreateProductInteractor implements UseCase<CreateProductDto, Product>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(payload: CreateProductDto): Promise<Product> {
        payload.status = true;
        payload.name = payload.name.trim();
        payload.description = payload.description.trim();
        if(!payload.name || !payload.description || !payload.image || !payload.price || !payload.category_id) throw Error ('Missing fields')
        if(!isValidName(payload.name)) throw Error ('Invalid name')
        if(payload.description.length < 10) throw Error ('Description too short')
        if(payload.price < 0) throw Error ('Invalid price')
        if(!payload.image.includes('data:image')) throw Error ('Invalid image')
        if(!await existsCategoryById(payload.category_id)) throw Error ('Category not found')
        if(!payload.stock) payload.status = false;
        return this.productsRepository.createProduct(payload);
    }
}