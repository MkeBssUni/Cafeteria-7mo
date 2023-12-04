import { Discount } from "../modules/discounts/entities/discount";
import { ReceiptDto, ReceiptProductsDto } from "../modules/orders/adapters/dto";
import { DiscountTypes } from "./enums";

export const generateReceipt = (discount: Discount, subtotal: number, products: ReceiptProductsDto[]): ReceiptDto => {
    let total: number = 0;
    if (discount) {
        switch (discount.type) {
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
        }
    } else {
        return {
            subtotal: subtotal,
            discount: 0,
            total: subtotal,
            products: products
        } as ReceiptDto;
    }
}