import { UseCase } from "../../../kernel/contracts";
import { isValidName } from "../../../kernel/validations";
import { existsCategoryById } from "../boundary";
import { Product } from "../entities/product";
import { ProductsRepository } from "./ports/products-repository";
import { UpdateProductDto } from "../adapters/dto/update-product-dto";

export class UpdateProductInteractor implements UseCase<UpdateProductDto, Product>{
    constructor(private readonly productsRepository: ProductsRepository){}
    async execute(payload: UpdateProductDto): Promise<Product> {
        payload.name = payload.name.trim();
        payload.description = payload.description.trim();
        if(!payload.name || !payload.description || !payload.image || !payload.price || !payload.category_id) throw Error ('Missing fields')
        if(!isValidName(payload.name)) throw Error ('Invalid name')
        if(payload.description.length < 10) throw Error ('Description too short')
        if(payload.price < 0) throw Error ('Invalid price')
        if(!payload.image.includes('data:image')) throw Error ('Invalid image')
        if(!await existsCategoryById(payload.category_id)) throw Error ('Category not found')
        if(!await this.productsRepository.existsProductById(payload.id)) throw Error ('Product not found')
        return this.productsRepository.updateProduct(payload);
    }
}