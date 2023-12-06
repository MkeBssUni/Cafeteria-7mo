import { Router } from "express";
import { UsersController } from "./users-controller";
const router = Router();

router.post('/', UsersController.Create)

export default router;