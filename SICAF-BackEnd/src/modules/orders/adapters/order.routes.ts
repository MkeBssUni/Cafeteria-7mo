import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post('/confirmationReceipt', OrderController.getReceipt);
router.post('/saveOrder', OrderController.saveOrder);
router.post('/saveOnlineOrder', OrderController.saveOnlineOrder);
router.get('/presential', OrderController.getAllOrders);
router.get('/online', OrderController.getAllOnlineOrders);
router.get('/history/:client', OrderController.getOrderHistoryByClient);
router.get('/online/history/:client', OrderController.getOnlineOrderHistoryByClient);

export default router;