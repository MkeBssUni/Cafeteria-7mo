import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post('/confirmationReceipt', OrderController.getReceipt);
router.post('/saveOrder', OrderController.saveOrder);
router.post('/saveOnlineOrder', OrderController.saveOnlineOrder);
router.get('/history/:client', OrderController.getOrderHistoryByClient);

export default router;