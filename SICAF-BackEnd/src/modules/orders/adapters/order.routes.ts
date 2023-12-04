import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post('/confirmationReceipt', OrderController.getReceipt);
router.post('/saveOnlineOrder', OrderController.saveOnlineOrder);

export default router;