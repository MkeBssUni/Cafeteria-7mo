import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { validateStringLength } from "../../../kernel/validations";
import { SaveDiscountDto } from "../adapters/dto/SaveDiscountDto";
import { addDiscountToProduct, existsCategoryById, existsProductById, getProductsIdByCategory } from "../boundary";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "./ports/discount.repository";

export class SaveDiscountInteractor implements UseCase<SaveDiscountDto, Discount> {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async execute(payload: SaveDiscountDto): Promise<Discount> {
        payload.description = payload.description.trim();
        if (!payload.type || !payload.description || !payload.percentage) throw new Error('Missing fields');    
        if (payload.end_date && !payload.start_date) throw new Error('Missing fields');
        if (!validateStringLength(payload.description, 10, 250)) throw new Error('Invalid description');
        if (payload.percentage < 0 || payload.percentage > 100) throw new Error('Invalid percentage');
        if (payload.start_date && isNaN(Date.parse(payload.start_date.toString()))) throw new Error('Invalid date');
        if (payload.end_date && isNaN(Date.parse(payload.end_date.toString()))) throw new Error('Invalid date');
        if (payload.start_date && payload.end_date) {
            if (payload.start_date > payload.end_date) throw new Error('Invalid dates');
        }
        if(payload.image && !payload.image.includes('data:image')) throw Error ('Invalid image');
        switch (payload.type) {
            case DiscountTypes.discountByRol:
                if (!payload.rol_id) throw new Error('Missing fields');
                if (isNaN(payload.rol_id)) throw new Error('Invalid id');
                break;
            case DiscountTypes.discountByOrderTotal:
                if (!payload.order_total) throw new Error('Missing fields');
                if (payload.order_total < 0) throw new Error('Invalid price');
                break;
            case DiscountTypes.discountByCategory:
                if (!payload.category_id) throw new Error('Missing fields');
                if (isNaN(payload.category_id)) throw new Error('Invalid id');
                if (!await existsCategoryById(payload.category_id)) throw new Error('Category not found');
                const products: number[] = await getProductsIdByCategory(payload.category_id);
                payload.products_id = products;
                break;
            case DiscountTypes.discountByProduct:
                if (!payload.products_id || !payload.products_id.length) throw new Error('Missing fields');
                for (let id of payload.products_id) {
                    if (isNaN(id)) throw new Error('Invalid id');
                    if (!await existsProductById(id)) throw new Error('Product not found');
                }
                break;
            case DiscountTypes.discountByProductsTotal:
                if (!payload.products_number) throw new Error('Missing fields');
                if (payload.products_number < 0) throw new Error('Invalid number');
                if (!payload.products_id || !payload.products_id.length) throw new Error('Missing fields');
                for (let id of payload.products_id) {
                    if (isNaN(id)) throw new Error('Invalid id');
                    if (!await existsProductById(id)) throw new Error('Product not found');
                }
                break;
            default:
                throw new Error('Invalid discount type');
        }
        const discount = await this.discountRepository.save(payload);
        if (!discount) throw new Error('Discount not saved');
        //editar rol
        if (payload.products_id && payload.products_id.length) {
            for (let id of payload.products_id) {
                const addDiscount = await addDiscountToProduct({product_id: id, discount_id: discount.id!});
                if (!addDiscount) throw new Error('Discount not saved');
            }
        }
        return discount;
    }
}