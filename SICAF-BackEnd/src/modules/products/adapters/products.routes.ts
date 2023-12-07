import { Router } from "express";
import { ProductsController } from "./products-controller";

const router = Router();

router.post("/", ProductsController.CreateProduct);
router.get("/getAll/", ProductsController.GetProducts);
router.get("/getByCategory/:category_id", ProductsController.GetProductsByCategory);
router.get("/getByStatus/:status", ProductsController.GetProductsByStatus);
router.get("/getByStatusAndCategory/:status/:category_id", ProductsController.GetProductsByCategoryAndStatus);
router.put("/:id", ProductsController.UpdateProduct);
router.get("/:id", ProductsController.GetProductById);
router.put("/changeStatus/:id", ProductsController.ChangeStatus);
router.post("/search/", ProductsController.SearchByName);
export default router;