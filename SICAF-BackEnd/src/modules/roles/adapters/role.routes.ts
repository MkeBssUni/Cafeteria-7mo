import { Router } from "express";
import { RoleController } from "./role.controller";

const router = Router();

router.get('/', RoleController.getRoles);

export default router;