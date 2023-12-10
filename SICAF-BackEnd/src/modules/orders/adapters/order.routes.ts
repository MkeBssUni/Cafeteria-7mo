import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post('/confirmationReceipt', OrderController.getReceipt);
router.post('/saveOrder', OrderController.saveOrder);
router.post('/saveOnlineOrder', OrderController.saveOnlineOrder);
router.put('/status', OrderController.changeOrderStatus);
router.get('/presential', OrderController.getAllOrders);
router.get('/online', OrderController.getAllOnlineOrders);
router.get('/history', OrderController.getOrderHistoryByClient);
router.get('/online/history', OrderController.getOnlineOrderHistoryByClient);

export default router;