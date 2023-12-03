import { Router } from "express";
import { ProvidersController } from "./providers-controller";

const router = Router();

router.post("/", ProvidersController.CreateProvider);
router.patch("/:id", ProvidersController.ChangeStatusProvider);

export default router;