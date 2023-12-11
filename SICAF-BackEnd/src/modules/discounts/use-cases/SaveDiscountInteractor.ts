import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { sendDiscountsEmail } from "../../../kernel/functions";
import { validateStringLength } from "../../../kernel/validations";
import { DiscountEmailDto } from "../adapters/dto";
import { SaveDiscountDto } from "../adapters/dto/SaveDiscountDto";
import { addDiscountToProduct, existsProductById, existsRoleById, findCategoryById, findProductById, findProductsIdByCategory, findUserEmails, updateRoleDiscount } from "../boundary";
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

        let email = {} as DiscountEmailDto;

        switch (payload.type) {
            case DiscountTypes.discountByRol:
                if (!payload.rol_id) throw new Error('Missing fields');
                if (isNaN(payload.rol_id)) throw new Error('Invalid id');
                if (!await existsRoleById(payload.rol_id)) throw new Error('Role not found');
                break;
            case DiscountTypes.discountByOrderTotal:
                if (!payload.order_total) throw new Error('Missing fields');
                if (payload.order_total < 0) throw new Error('Invalid price');
                email = {
                    type: payload.type,
                    percentage: payload.percentage,
                    description: payload.description,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    amount: payload.order_total
                } as DiscountEmailDto;
                break;
            case DiscountTypes.discountByCategory:
                if (!payload.category_id) throw new Error('Missing fields');
                if (isNaN(payload.category_id)) throw new Error('Invalid id');
                const category = await findCategoryById(payload.category_id);
                if (!category) throw new Error('Category not found');
                const products: number[] = await findProductsIdByCategory(payload.category_id);
                payload.products_id = products;
                email = {
                    type: payload.type,
                    percentage: payload.percentage,
                    description: payload.description,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    category: (String)(category.name)
                } as DiscountEmailDto;
                break;
            case DiscountTypes.discountByProduct:
                if (!payload.products_id || !payload.products_id.length) throw new Error('Missing fields');
                let emailProducts: { name: string, price: number }[] = [];
                for (let id of payload.products_id) {
                    if (isNaN(id)) throw new Error('Invalid id');
                    const product = await findProductById(id);
                    if (!product) throw new Error('Product not found');
                    emailProducts.push({ name: product.name, price: product.price });                
                }
                email = {
                    type: payload.type,
                    percentage: payload.percentage,
                    description: payload.description,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    products: emailProducts
                } as DiscountEmailDto;
                break;
            case DiscountTypes.discountByProductsTotal:
                let emailProducts_: { name: string, price: number }[] = [];
                if (!payload.products_number) throw new Error('Missing fields');
                if (payload.products_number < 0) throw new Error('Invalid number');
                if (!payload.products_id || !payload.products_id.length) throw new Error('Missing fields');
                for (let id of payload.products_id) {
                    if (isNaN(id)) throw new Error('Invalid id');
                    const product = await findProductById(id);
                    if (!product) throw new Error('Product not found');
                    emailProducts_.push({ name: product.name, price: product.price }); 
                }
                email = {
                    type: payload.type,
                    percentage: payload.percentage,
                    description: payload.description,
                    start_date: payload.start_date,
                    end_date: payload.end_date,
                    products: emailProducts_,
                    quantity: payload.products_number
                } as DiscountEmailDto;
                break;
            default:
                throw new Error('Invalid discount type');
        }

        const discount = await this.discountRepository.save(payload);
        if (!discount) throw new Error('Error saving discount');

        if (payload.rol_id) {
            const roleDiscount = await updateRoleDiscount({ id: payload.rol_id!, discount: discount.id! });
                if (!roleDiscount) throw new Error('Error saving discount');
                email = {
                    type: payload.type,
                    percentage: payload.percentage,
                    description: payload.description,
                    rol: roleDiscount.name
                } as DiscountEmailDto;
        }

        if (payload.products_id && payload.products_id.length) {
            for (let id of payload.products_id) {
                const addDiscount = await addDiscountToProduct({product_id: id, discount_id: discount.id!});
                if (!addDiscount) throw new Error('Error saving discount');
            }
        }

        let userEmails: string[] = [];
        (payload.rol_id) ? userEmails = await findUserEmails([payload.rol_id]) : userEmails = await findUserEmails([2, 3]);
        const responseEmail = sendDiscountsEmail({ 
            emails: userEmails, 
            discount: email
        });
        if (!responseEmail) throw new Error('Error sending email');

        return discount;
    }
}