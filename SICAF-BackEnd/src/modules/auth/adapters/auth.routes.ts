import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post('/login', AuthController.login);
router.post('/forgotPassword', AuthController.generateResetToken);
router.post('/recoverPassword', AuthController.resetPassword);

export default router;