import { Router } from "express";
import { ProvidersController } from "./providers-controller";

const router = Router();

router.post("/", ProvidersController.CreateProvider);
router.patch("/:id", ProvidersController.ChangeStatusProvider);
router.get("/", ProvidersController.GetAllProviders);
router.get("/:id", ProvidersController.GetProviderById);
router.put("/:id", ProvidersController.UpdateProvider)

export default router;