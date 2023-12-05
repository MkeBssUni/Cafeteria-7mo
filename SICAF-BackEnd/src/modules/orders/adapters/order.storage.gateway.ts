import { pool } from "../../../config/bdconfig";
import { Order } from "../entities/order";
import { OrderRepository } from "../use-cases/ports/order.repository";
import { SaveOnlineOrderDto } from "./dto";

export class OrderStorageGateway implements OrderRepository {
    async saveOnlineOrder(payload: SaveOnlineOrderDto): Promise<Order> {
        try {
            const { type, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, comments, products } = payload;
            await pool.query('begin');
            const response = await pool.query("insert into orders (type, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, comments) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *", [type, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, comments]);
            const order = response.rows[0] as Order;
            for (let i = 0; i < products.length; i++) {
                await pool.query("insert into order_details (order_id, product_id, products_sold, discount_id, subtotal, total) values ($1, $2, $3, $4, $5, $6)", [order.id, products[i].id, products[i].quantity, (products[i].discount ? discount_id : null), products[i].subtotal, products[i].total]);
            }
            await pool.query('commit');
            return order;
        } catch (e) {
            await pool.query('rollback');
            throw Error;
        }
    }
    
}