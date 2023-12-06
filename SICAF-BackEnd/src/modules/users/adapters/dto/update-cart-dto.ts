export type UpdateCartDto={
    user_id: number;
    cart:[{
        product_id: number;
        quantity: number;
    }]
}