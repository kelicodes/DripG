import express from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus
} from "../controllers/orderController.js";
import Auth from "../middleware/Auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", Auth, createOrder);
orderRouter.get("/my-orders", Auth, getMyOrders);

// admin
orderRouter.get("/all", Auth, getAllOrders);
orderRouter.put("/:orderId/status", Auth, updateOrderStatus);

export default router;
