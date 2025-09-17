import express from "express";
import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategories,
  subCategory,
} from "../controllers/categoryController.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const categoryRouter = express.Router();

// Category routes
categoryRouter.post("/add_category", adminAuth, addCategory);
categoryRouter.get("/get_category", adminAuthOptional, getCategories);
categoryRouter.put("/update_category/:id", adminAuth, updateCategory);
categoryRouter.delete("/delete_category/:id", adminAuth, deleteCategory);

// Subcategory routes
categoryRouter.post("/add_subcategory", adminAuth, subCategory);
categoryRouter.get("/get_subcategory", adminAuthOptional, getSubCategories);
categoryRouter.put("/update_subcategory/:id", adminAuth, updateSubCategory);
categoryRouter.delete("/delete_subcategory/:id", adminAuth, deleteSubCategory);

export default categoryRouter;
