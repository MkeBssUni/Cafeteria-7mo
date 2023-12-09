import { pool } from "../../../config/bdconfig";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "../use-cases/ports/discount.repository";
import { SaveDiscountDto, UpdateDiscountDto, ChangeStatusDto } from "./dto";

export class DiscountStorageGateway implements DiscountRepository {
    async findAll(): Promise<Discount[]> {
        try {
            const response = await pool.query("select * from discounts");
            return response.rows as Discount[];
        } catch (e) {
            throw Error
        }
    }

    async findById(id: number): Promise<Discount> {
        try {
            const response = await pool.query("select * from discounts where id = $1", [id]);
            return response.rows[0] as Discount;
        } catch (e) {
            throw Error
        }
    }

    async findByOrderTotal(order_total: number): Promise<Discount[]> {
        try {
            const response = await pool.query("select * from discounts where order_total <= $1", [order_total]);
            return response.rows as Discount[];
        } catch (e) {
            throw Error
        }
    }

    async findByRole(id: number): Promise<Discount[]> {
        try {
            const response = await pool.query("select d.* from discounts d join roles r on d.id = r.discount_id where r.id = $1", [id]);
            return response.rows as Discount[];
        } catch (e) {
            throw Error
        }
    }
    
    async save(payload: SaveDiscountDto): Promise<Discount> {
        try {
            const { type, description, percentage, start_date, end_date, order_total, products_number, image } = payload;
            const response = await pool.query("insert into discounts (type, description, percentage, start_date, end_date, order_total, products_number, image) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [type, description, percentage, start_date, end_date, order_total, products_number, image]);
            return response.rows[0] as Discount;
        } catch (e) {
            throw Error
        }
    }

    async update(payload: UpdateDiscountDto): Promise<Discount> {
        try {
            const { id, description, percentage, start_date, end_date, order_total, products_number, image } = payload;
            const response = await pool.query("update discounts set description = $1, percentage = $2, start_date = $3, end_date = $4, order_total = $5, products_number = $6, image = $7 where id = $8 returning *", [description, percentage, start_date, end_date, order_total, products_number, image, id]);
            return response.rows[0] as Discount;
        } catch (e) {
            throw Error
        }
    }

    async changeStatus(payload: ChangeStatusDto): Promise<boolean> {
        try {
            const { id, status } = payload;
            const response = await pool.query("update discounts set status = $1 where id = $2 returning *", [status, id]);
            return response.rows[0].status === status;
        } catch (e) {
            throw Error
        }
    }
}