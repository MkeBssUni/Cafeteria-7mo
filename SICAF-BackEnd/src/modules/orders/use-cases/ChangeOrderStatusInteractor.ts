import { UseCase } from "../../../kernel/contracts";
import { OrderStatus, OrderTypes } from "../../../kernel/enums";
import { validateStringLength } from "../../../kernel/validations";
import { ChangeStatusDto } from "../adapters/dto";
import { findProductById, updateProductStock } from "../boundary";
import { Order } from "../entities/order";
import { OrderRepository } from "./ports/order.repository";

export class changeOrderStatusInteractor implements UseCase<ChangeStatusDto, Order> {
    constructor(private readonly repository: OrderRepository) {}

    async execute(payload: ChangeStatusDto): Promise<Order> {
        if (!payload.id || !payload.status) throw new Error('Missing fields');
        if (isNaN(payload.id)) throw new Error('Invalid id');
        if (payload.comments && !validateStringLength(payload.comments, 0, 255)) throw new Error("Invalid comment");

        const order = await this.repository.findById(payload.id);
        if (!order) throw new Error('Order not found');

        if (order.status === OrderStatus.canceled) throw new Error('Invalid status');
        if (order.type === OrderTypes.presential && payload.status !== OrderStatus.canceled) throw new Error('Invalid status');
        if (order.type === OrderTypes.online) {
            if (order.status === OrderStatus.completed) throw new Error('Invalid status');
            if (payload.status !== OrderStatus.pending && payload.status !== OrderStatus.preparation && payload.status !== OrderStatus.completed && payload.status !== OrderStatus.canceled) throw new Error('Invalid status');
        }

        const orderUpdated = await this.repository.changeOrderStatus(payload);
        if (!orderUpdated) throw new Error('Error updating order');

        if (payload.status === OrderStatus.canceled) {
            const products = await this.repository.findOrderDetailsById(payload.id);
            for (let i = 0; i < products.length; i++) {
                const product = await findProductById(products[i].product_id);
                await updateProductStock({ id: products[i].product_id, stock: (product.stock + products[i].products_sold) });
            }
        }

        return orderUpdated;
    }
}