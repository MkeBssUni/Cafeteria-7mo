import { Router } from "express";
import { CategoriesController } from "./categories-controller";

const router= Router();

router.post('/', CategoriesController.CreateCategory);
router.get('/', CategoriesController.GetCategories);
router.post('/search/', CategoriesController.SearchCategories);
router.get('/status/', CategoriesController.GetCategoriesByStatus);
router.get('/:id', CategoriesController.GetCategoryById);
router.put('/changeStatus/:id', CategoriesController.ChangeStatusCategory);
router.put('/:id', CategoriesController.UpdateCategory);

export default router;