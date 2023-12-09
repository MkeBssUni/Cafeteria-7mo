import { pool } from "../../../config/bdconfig";
import { Order } from "../entities/order";
import { OrderRepository } from "../use-cases/ports/order.repository";
import { GetOrderDetailsDto, OrderDetailsDto, SaveOnlineOrderDto, SaveOrderDto } from "./dto";

export class OrderStorageGateway implements OrderRepository {
    async countOrdersByClient(payload: GetOrderDetailsDto): Promise<number> {
        try {
            const response = await pool.query("select count(*) from orders where client_id = $1 and type = $2", [payload.client, payload.type]);
            return parseInt(response.rows[0].count);
        } catch (e) {
            throw Error;
        } 
    }

    async findOrderDetailsByClient(payload: GetOrderDetailsDto): Promise<OrderDetailsDto[]> {
        try {
            let orderDetails: OrderDetailsDto[] = [];
            const orderCount: number = await this.countOrdersByClient({ client: payload.client, type: payload.type } as GetOrderDetailsDto);
            for (let i = 0; i < orderCount; i++) {
                const orderResponse = await pool.query("select * from orders where client_id = $1 and type = $2 order by id desc", [payload.client, payload.type]);
                const order = orderResponse.rows[0] as Order;
                const detailsResponse = await pool.query("select * from order_details where order_id = $1", [order.id]);
                const orderDetails = detailsResponse.rows;
                orderDetails.push({
                    order,
                    orderDetails
                });
            }
            return orderDetails;
        } catch (e) {
            throw Error;
        }
    }

    async saveOrder(payload: SaveOrderDto): Promise<Order> {
        try {
            const { type, employee_id, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, comments, products } = payload;
            await pool.query('begin');
            const response = await pool.query("insert into orders (type, employee_id, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, comments) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) returning *", [type, employee_id, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, comments]);
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

    async saveOnlineOrder(payload: SaveOnlineOrderDto): Promise<Order> {
        try {
            const { type, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt, products } = payload;
            await pool.query('begin');
            const response = await pool.query("insert into orders (type, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt) values ($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *", [type, client_id, products_sold, subtotal, payment_method, discount_id, total, status, send_receipt]);
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