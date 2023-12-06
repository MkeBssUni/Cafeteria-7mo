import { Router } from "express";
import { UsersController } from "./users-controller";
const router = Router();

router.post('/', UsersController.Create)
router.get('/cart/:id', UsersController.GetCartById)

export default router;