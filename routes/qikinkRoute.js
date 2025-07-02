import express from "express";
import {
  getQikinkToken,
  //   createQikinkOrder,
} from "../controllers/qikinkOrderController.js";

const qikinkRouter = express.Router();

qikinkRouter.post("/get-token", getQikinkToken);

// qikinkRouter.post("/create-order", createQikinkOrder);

export default qikinkRouter;
