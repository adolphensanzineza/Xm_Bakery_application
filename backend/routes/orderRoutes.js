import express from "express";
import {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
} from "../controllers/orderController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public: a customer can see their orders only (you can enhance this later)
router.get("/", authMiddleware, getOrders);
router.get("/:id", authMiddleware, getOrder);

// Admin or customer actions
router.post("/", authMiddleware, createOrder);
router.put("/:id", authMiddleware, updateOrder);
router.delete("/:id", authMiddleware, deleteOrder);

export default router;
