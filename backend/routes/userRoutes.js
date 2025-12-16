import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin-only routes
router.get("/", getUsers);      // Get all users
router.get("/:id", authMiddleware, getUser);   // Get single user
router.post("/", authMiddleware, createUser);  // Create user
router.put("/:id", authMiddleware, updateUser);// Update user
router.delete("/:id", authMiddleware, deleteUser); // Delete user

export default router;
