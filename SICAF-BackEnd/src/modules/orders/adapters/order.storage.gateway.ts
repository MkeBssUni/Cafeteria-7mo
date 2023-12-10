import { pool } from "../../../config/bdconfig";
import { OrderTypes } from "../../../kernel/enums";
import { Order } from "../entities/order";
import { OrderRepository } from "../use-cases/ports/order.repository";
import { FilterDto, GetHistoryDto, OnlineOrderHistoryDto, OrderHistoryDto, ReceiptProductsDto, SaveOnlineOrderDto, SaveOrderDto } from "./dto";

export class OrderStorageGateway implements OrderRepository {
    private filter(payload: FilterDto): string {
        switch (payload.filter) {
            case 'day':
                return `and o.created_at::date = '${payload.value}'`;
            case 'month':
                return `and to_char(o.created_at, 'YYYY-MM') = '${payload.value}'`;
            case 'year':
                return `and to_char(o.created_at, 'YYYY') = '${payload.value}'`;
            default:
                return '';
        }
    } 

    async findAllOrders(payload: FilterDto): Promise<OrderHistoryDto[]> {
        try {
            const filter: string = this.filter(payload);
            const response = await pool.query(`select o.id, CONCAT(p.name,' ',p.lastname) as employee, CONCAT(p2.name,' ',p2.lastname) as client, o.payment_method, o.status, o.products_sold, o.subtotal, o.total, o.send_receipt, o.comments, o.created_at as date from orders o inner join users u on o.employee_id = u.id inner join people p on u.id = p.user_id left join users u2 on o.client_id = u2.id left join people p2 on u2.id = p2.user_id where o.type = '${OrderTypes.presential}' ${filter} order by o.id desc`);
            const orders = response.rows as OrderHistoryDto[];
            for (let i = 0; i < orders.length; i++) {
                const response = await pool.query(`select c.name as category, p.name as name, o.products_sold as quantity, o.subtotal, o.total from order_details o inner join products p on o.product_id = p.id inner join categories c on p.category_id = c.id where o.order_id = ${orders[i].id}`);
                orders[i].products = response.rows as ReceiptProductsDto[];
            }
            return orders;
        } catch (e) {
            throw Error;
        }
    }

    async findAllOnlineOrders(payload: FilterDto): Promise<OnlineOrderHistoryDto[]> {
        try {
            const filter: string = this.filter(payload);
            const response = await pool.query(`select o.id, CONCAT(p.name,' ',p.lastname) as client, o.payment_method, o.status, o.products_sold, o.subtotal, o.total, o.created_at as date from orders o inner join users u on o.client_id = u.id inner join people p on u.id = p.user_id where o.type = '${OrderTypes.online}' ${filter} order by o.id desc`);
            const orders = response.rows as OnlineOrderHistoryDto[];
            for (let i = 0; i < orders.length; i++) {
                const response = await pool.query(`select c.name as category, p.name as name, o.products_sold as quantity, o.subtotal, o.total from order_details o inner join products p on o.product_id = p.id inner join categories c on p.category_id = c.id where o.order_id = ${orders[i].id}`);
                orders[i].products = response.rows as ReceiptProductsDto[];
            }
            return orders;
        } catch (e) {
            throw Error;
        }
    }

    async getOrderHistoryByClient(payload: GetHistoryDto): Promise<OrderHistoryDto[]> {
        try {
            const filter: string = this.filter(payload.filter);
            const response = await pool.query(`select o.id, CONCAT(p.name,' ',p.lastname) as employee, CONCAT(p2.name,' ',p2.lastname) as client, o.payment_method, o.status, o.products_sold, o.subtotal, o.total, o.send_receipt, o.comments, o.created_at as date from orders o inner join users u on o.employee_id = u.id inner join people p on u.id = p.user_id inner join users u2 on o.client_id = u2.id inner join people p2 on u2.id = p2.user_id where o.client_id = ${payload.client} and o.type = '${OrderTypes.presential}' ${filter} order by o.id desc`);
            const orders = response.rows as OrderHistoryDto[];
            for (let i = 0; i < orders.length; i++) {
                const response = await pool.query(`select c.name as category, p.name as name, o.products_sold as quantity, o.subtotal, o.total from order_details o inner join products p on o.product_id = p.id inner join categories c on p.category_id = c.id where o.order_id = ${orders[i].id}`);
                orders[i].products = response.rows as ReceiptProductsDto[];
            }
            return orders;
        } catch (e) {
            throw Error;
        }
    }

    async getOnlineOrderHistoryByClient(payload: GetHistoryDto): Promise<OnlineOrderHistoryDto[]> {
        try {
            const filter: string = this.filter(payload.filter);
            const response = await pool.query(`select o.id, CONCAT(p.name,' ',p.lastname) as client, o.payment_method, o.status, o.products_sold, o.subtotal, o.total, o.created_at as date from orders o inner join users u on o.client_id = u.id inner join people p on u.id = p.user_id where o.client_id = ${payload.client} and o.type = '${OrderTypes.online}' ${filter} order by o.id desc`);
            const orders = response.rows as OnlineOrderHistoryDto[];
            for (let i = 0; i < orders.length; i++) {
                const response = await pool.query(`select c.name as category, p.name as name, o.products_sold as quantity, o.subtotal, o.total from order_details o inner join products p on o.product_id = p.id inner join categories c on p.category_id = c.id where o.order_id = ${orders[i].id}`);
                orders[i].products = response.rows as ReceiptProductsDto[];
            }
            return orders;
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