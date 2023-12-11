import { Router } from "express";
import { OrderController } from "./order.controller";

const router = Router();

router.post('/confirmationReceipt', OrderController.getReceipt);
router.post('/saveOrder', OrderController.saveOrder);
router.post('/saveOnlineOrder', OrderController.saveOnlineOrder);
router.put('/status', OrderController.changeOrderStatus);
router.get('/presential/:filter/:value', OrderController.getAllOrders);
router.get('/online/:filter/:value', OrderController.getAllOnlineOrders);
router.get('/:id/history/:filter/:value', OrderController.getOrderHistoryByClient);
router.get('/:id/online/history/:filter/:value', OrderController.getOnlineOrderHistoryByClient);

export default router;