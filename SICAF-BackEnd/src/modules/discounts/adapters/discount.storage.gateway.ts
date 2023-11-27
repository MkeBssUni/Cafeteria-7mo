import { pool } from "../../../config/bdconfig";
import { Discount } from "../entities/discount";
import { DiscountRepository } from "../use-cases/ports/discount.repository";
import { SaveDiscountDto } from "./dto/SaveDiscountDto";

export class DiscountStorageGateway implements DiscountRepository {
    async save(payload: SaveDiscountDto): Promise<Discount> {
        try {
            const { type, description, percentage, start_date, end_date, order_total, products_number, image } = payload;
            const response = await pool.query("insert into discounts (type, description, percentage, start_date, end_date, order_total, products_number, image) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [type, description, percentage, start_date, end_date, order_total, products_number, image]);
            return response.rows[0] as Discount;
        } catch (e) {
            throw Error
        }
    }
}