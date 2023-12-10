import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { validateDate, validateDates } from "../../../kernel/validations";
import { Product } from "../../products/entities/product";
import { UserByIdDto } from "../../users/adapters/dto/UserByIdDto";
import { OrderDto } from "../adapters/dto";
import { findProductById, findUserById } from "../boundary";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "./ports/discount.repository";

export class GetByOrderInteractor implements UseCase<OrderDto, Discount[]> {
    constructor(private readonly discountRepository: DiscountRepository) {}

    async execute(payload: OrderDto): Promise<Discount[]> {
        let amount: number = 0;
        let products_sold: number = 0;
        let discounts: Discount[] = [];
        let discountsByTotal: Discount[] = [];
        let discountsByRole: Discount[] = [];

        if (!payload.client_id || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");

        const client: UserByIdDto = await findUserById(payload.client_id);
        if (!client) throw new Error("User not found");

        for (let i = 0; i < payload.products.length; i++) {
            if (!payload.products[i].id || !payload.products[i].quantity) throw new Error("Missing fields");
            if (isNaN(payload.products[i].id)) throw new Error("Invalid id");
            if (isNaN(payload.products[i].quantity) || payload.products[i].quantity < 0) throw new Error("Invalid quantity");
            
            const product: Product = await findProductById(payload.products[i].id);
            if (!product) throw new Error("Product not found");
            amount += Number(product.price * payload.products[i].quantity);
            products_sold += payload.products[i].quantity;

            if (product.discount_id) {
                const discount: Discount = await this.discountRepository.findById(product.discount_id);
                if (discount.type === DiscountTypes.discountByProductsTotal) {
                    if (payload.products[i].quantity === discount.products_number!) discounts.push(discount);
                } else {
                    discounts.push(discount);
                }       
            }
        }

        discountsByTotal = await this.discountRepository.findByOrderTotal(amount);
        discounts.push(...discountsByTotal);
        
        discountsByRole = await this.discountRepository.findByRole(client.role!);
        discounts.push(...discountsByRole);

        discounts = discounts.filter((discount, index, self) => self.findIndex(d => d.id === discount.id) === index);
        discounts = discounts.filter(discount => {
            if (discount.start_date && !discount.end_date && !validateDate(discount.start_date!)) return false;
            if (discount.start_date && discount.end_date && !validateDates(discount.start_date!, discount.end_date!)) return false;
            if (!discount.status) return false;
            return true;
        });
            
        return discounts;
    }
}