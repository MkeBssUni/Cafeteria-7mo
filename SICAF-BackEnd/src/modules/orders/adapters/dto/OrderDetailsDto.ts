export type OrderDetailsDto = {
    id: number,
    order_id: number,
    product_id: number,
    products_sold: number,
    discount_id: number,
    subtotal: number,
    discount?: number,
    total: number,
    created_at: Date
}