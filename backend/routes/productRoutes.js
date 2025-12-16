import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getProducts);   // Get all products
router.get("/:id", getProduct); // Get single product

// Admin-only routes
router.post("/", authMiddleware, createProduct); // Create product
router.put("/:id", authMiddleware, updateProduct); // Update product
router.delete("/:id", authMiddleware, deleteProduct); // Delete product

export default router;
