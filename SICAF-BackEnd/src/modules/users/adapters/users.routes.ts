import { Router } from "express";
import { UsersController } from "./users-controller";
const router = Router();

router.get('/status/', UsersController.FindByStatus)
router.get('/getByEmail/', UsersController.GetByEmail)
router.post('/', UsersController.Create)
router.patch('/changeStatus/:id', UsersController.ChangeStatus)
router.get('/:id', UsersController.GetById)
router.get('/', UsersController.FindAll)
router.get('/cart/:id', UsersController.GetCartById)
router.patch('/cart/', UsersController.UpdateShoppingCart)

export default router;