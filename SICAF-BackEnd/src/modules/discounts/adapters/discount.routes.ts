import { Router } from "express";
import { DiscountController } from "./discount.controller";

const router = Router();

router.get('/', DiscountController.findAllDiscounts);
router.get('/active', DiscountController.findActiveDiscounts);
router.post('/order', DiscountController.findDiscountsByOrder);
router.post('/', DiscountController.saveDiscount);
router.put('/', DiscountController.updateDiscount);
router.patch('/:id', DiscountController.changeStatus);

export default router;