import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { Product } from "../../products/entities/product";
import { Role } from "../../roles/entities/role";
import { DiscountByCategoryDto, DiscountByProductDto, DiscountByProductQuantityDto, DiscountByRolDto, DiscountByTotalDto, DiscountsDto } from "../adapters/dto";
import { findCategoryById, findProductsByDiscount, findRoleByDiscount } from "../boundary";
import { DiscountRepository } from "./ports/discount.repository";

export class AllDiscountsInteractor implements UseCase<null, DiscountsDto> {
    constructor(private readonly discountsRepository: DiscountRepository) {}

    async execute(): Promise<DiscountsDto> {
        let discountsByRol: DiscountByRolDto[] = [];
        let discountsByOrderTotal: DiscountByTotalDto[] = [];
        let discountsByProductsNumber: DiscountByProductQuantityDto[] = [];
        let discountsByProduct: DiscountByProductDto[] = [];
        let discountsByCategory: DiscountByCategoryDto[] = [];

        const discounts = await this.discountsRepository.findAll();
        
        for (let discount of discounts) {
            switch(discount.type) {
                case DiscountTypes.discountByRol:
                    const role: Role = await findRoleByDiscount(discount.id!);
                    if (role) {
                        discountsByRol.push({
                            id: discount.id!,
                            type: discount.type,
                            description: discount.description,
                            percentage: discount.percentage,
                            status: discount.status,
                            created_by: discount.created_by,
                            rol: {
                                id: role.id!,
                                name: role.name
                            } 
                        });
                    }
                    break;
                case DiscountTypes.discountByOrderTotal:
                    discountsByOrderTotal.push({
                        id: discount.id!,
                        type: discount.type,
                        description: discount.description,
                        percentage: discount.percentage,
                        start_date: discount.start_date,
                        end_date: discount.end_date,
                        order_total: discount.order_total!,
                        status: discount.status,
                        image: discount.image,
                        created_by: discount.created_by
                    
                    });
                    break;
                case DiscountTypes.discountByProductsTotal:
                    const products: Product[] = await findProductsByDiscount(discount.id!);
                    let productList = []
                    for (let product of products) {
                        productList.push({
                            id: product.id!,
                            name: product.name,                         
                        });
                    }                    
                    discountsByProductsNumber.push({
                        id: discount.id!,
                        type: discount.type,
                        description: discount.description,
                        percentage: discount.percentage,
                        start_date: discount.start_date,
                        end_date: discount.end_date,
                        products_number: discount.products_number!,
                        products: productList,
                        status: discount.status,
                        image: discount.image,
                        created_by: discount.created_by
                    
                    });
                    break;
                case DiscountTypes.discountByProduct:
                    const vproducts: Product[] = await findProductsByDiscount(discount.id!);
                    let vproductsList = []
                    for (let product of vproducts) {
                        vproductsList.push({
                            id: product.id!,
                            name: product.name,                         
                        });
                    }
                    discountsByProduct.push({
                        id: discount.id!,
                        type: discount.type,
                        description: discount.description,
                        percentage: discount.percentage,
                        start_date: discount.start_date,
                        end_date: discount.end_date,
                        products: vproductsList,
                        status: discount.status,
                        image: discount.image,
                        created_by: discount.created_by
                    });
                    break;
                case DiscountTypes.discountByCategory:
                    const uproducts: Product[] = await findProductsByDiscount(discount.id!);
                    const category = await findCategoryById(uproducts[0].category_id!);                    
                    discountsByCategory.push({
                        id: discount.id!,
                        type: discount.type,
                        description: discount.description,
                        percentage: discount.percentage,
                        start_date: discount.start_date,
                        end_date: discount.end_date,
                        category: {
                            id: uproducts[0].category_id!,
                            name: (String)(category.name)
                        },
                        status: discount.status,
                        image: discount.image,
                        created_by: discount.created_by                    
                    });
                    break;
                default:
                    break;
            }
        }

        return {
            discountsByRol,
            discountsByOrderTotal,
            discountsByProductsNumber,
            discountsByProduct,
            discountsByCategory
        };
    }
}