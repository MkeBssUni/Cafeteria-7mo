import { Router } from "express";
import { DiscountController } from "./discount.controller";

const router = Router();

router.post('/', DiscountController.saveDiscount);

export default router;