import express from "express";
import {
  getQikinkToken,
  createQikinkOrder,
  getAllQikinkOrders,
  getSingleQikinkOrder,
  checkQikinkOrderStatus,
  getUserQikinkOrders,
} from "../controllers/qikinkOrderController.js";
import authUser from "../middleware/auth.js";

const qikinkRouter = express.Router();

qikinkRouter.post("/get-token", getQikinkToken);
qikinkRouter.post("/create-order", authUser, createQikinkOrder);

qikinkRouter.get("/get-orders", getAllQikinkOrders);
qikinkRouter.get("/get-order/:id", getSingleQikinkOrder);
qikinkRouter.get("/user-orders", authUser, getUserQikinkOrders);

qikinkRouter.get("/check-order-status/:orderId", checkQikinkOrderStatus);

export default qikinkRouter;
