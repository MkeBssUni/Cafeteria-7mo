import { Router } from "express";
import { ProductsController } from "./products-controller";

const router = Router();

router.post("/", ProductsController.CreateProduct);
router.get("/getAll/", ProductsController.GetProducts);
router.get("/getByCategory/", ProductsController.GetProductsByCategory);
router.get("/getByStatus/", ProductsController.GetProductsByStatus);
router.put("/:id", ProductsController.UpdateProduct);
router.get("/:id", ProductsController.GetProductById);
router.put("/changeStatus/:id", ProductsController.ChangeStatus);
router.post("/search/", ProductsController.SearchByName);
export default router;