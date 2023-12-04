import { UseCase } from "../../../kernel/contracts";
import { DiscountTypes } from "../../../kernel/enums";
import { Discount } from "../../discounts/entities/discount";
import { Product } from "../../products/entities/product";
import { GetReceiptDto, ReceiptDto, ReceiptProductsDto } from "../adapters/dto";
import { findDiscountById, findProductById } from "../boundary";
import { OrderRepository } from "./ports/order.repository";

export class GetReceiptInteractor implements UseCase<GetReceiptDto, ReceiptDto> {
    constructor(private readonly orderRepository: OrderRepository) {}

    async execute(payload: GetReceiptDto): Promise<ReceiptDto> {
        if (!payload.client_id || !payload.products.length) throw new Error("Missing fields");
        if (isNaN(payload.client_id)) throw new Error("Invalid id");
        //validar que el cliente exista

        let subtotal: number = 0;
        let total: number = 0;
        let discount: Discount | null = null;
        let products: ReceiptProductsDto[] = [];

        if (payload.discount_id) {
            if (isNaN(payload.discount_id)) throw new Error("Invalid id");
            const optionalDiscount: Discount = await findDiscountById(payload.discount_id);
            if (!optionalDiscount) throw new Error("Discount not found");
            discount = optionalDiscount;
        }

        for (let i = 0; i < payload.products.length; i++) {
            if (!payload.products[i].id || !payload.products[i].quantity) throw new Error("Missing fields");
            if (isNaN(payload.products[i].id)) throw new Error("Invalid id");
            if (isNaN(payload.products[i].quantity) || payload.products[i].quantity < 0) throw new Error("Invalid quantity");

            const optionalProduct: Product = await findProductById(payload.products[i].id);
            if (!optionalProduct) throw new Error("Product not found");

            subtotal += optionalProduct.price * payload.products[i].quantity;

            products.push({
                id: optionalProduct.id!,
                name: optionalProduct.name,
                quantity: payload.products[i].quantity,
                price: optionalProduct.price,
                subtotal: optionalProduct.price * payload.products[i].quantity,
                discount: discount ? optionalProduct.discount_id : 0,
                total: optionalProduct.price * payload.products[i].quantity
            });
        }
        
        switch (discount?.type) {
            case DiscountTypes.discountByRol:
                //validar que payload.client_id tenga el rol correspondiente
                console.log("Descuento por rol");
                throw new Error("Not implemented");
            case DiscountTypes.discountByOrderTotal:
                if (discount.order_total! > subtotal) throw new Error("Discount not applicable");
                const appliedDiscount = Math.round(subtotal * (discount.percentage / 100) * 100) / 100;
                for (let i = 0; i < products.length; i++) {
                    products[i].discount = 0;
                    products[i].total = products[i].subtotal;
                }
                return {
                    subtotal: subtotal,
                    discount: appliedDiscount * (-1),
                    total: subtotal - appliedDiscount,
                    products: products
                } as ReceiptDto;
            case DiscountTypes.discountByCategory:
                for (let i = 0; i < products.length; i++) {
                    if (products[i].discount === discount.id) {
                        products[i].discount = Math.round(products[i].subtotal * (discount.percentage / 100) * 100) / 100;
                        products[i].total = products[i].subtotal - products[i].discount!;
                    } else {
                        products[i].discount = 0;
                        products[i].total = products[i].subtotal;
                    }
                    total += products[i].total;
                }
                return {
                    subtotal: subtotal,
                    discount: total - subtotal,
                    total: total,
                    products: products
                } as ReceiptDto;
            case DiscountTypes.discountByProduct:
                for (let i = 0; i < products.length; i++) {
                    if (products[i].discount === discount.id) {
                        products[i].discount = Math.round(products[i].subtotal * (discount.percentage / 100) * 100) / 100;
                        products[i].total = products[i].subtotal - products[i].discount!;
                    } else {
                        products[i].discount = 0;
                        products[i].total = products[i].subtotal;
                    }
                    total += products[i].total;
                }
                return {
                    subtotal: subtotal,
                    discount: total - subtotal,
                    total: total,
                    products: products
                } as ReceiptDto;
            case DiscountTypes.discountByProductsTotal:
                for (let i = 0; i < products.length; i++) {
                    if (products[i].discount === discount.id && products[i].quantity === discount.products_number!) {
                        products[i].discount = Math.round(products[i].subtotal * (discount.percentage / 100) * 100) / 100;
                        products[i].total = products[i].subtotal - products[i].discount!;
                    } else {
                        products[i].discount = 0;
                        products[i].total = products[i].subtotal;
                    }
                    total += products[i].total;
                }
                return {
                    subtotal: subtotal,
                    discount: total - subtotal,
                    total: total,
                    products: products
                } as ReceiptDto;
            default:
                return {
                    subtotal: subtotal,
                    discount: 0,
                    total: subtotal,
                    products: products
                } as ReceiptDto;
        }
    }
}