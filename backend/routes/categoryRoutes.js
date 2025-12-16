import express from "express";
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoryController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public route
router.get("/", getCategories); // Get all categories
router.get("/:id", getCategory); // Get single category

// Admin-only routes
router.post("/", authMiddleware, createCategory); // Create category
router.put("/:id", authMiddleware, updateCategory); // Update category
router.delete("/:id", authMiddleware, deleteCategory); // Delete category

export default router;
