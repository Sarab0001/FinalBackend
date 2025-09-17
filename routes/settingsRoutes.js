import express from "express";
import {
  getSettings,
  updateSettings,
} from "../controllers/settingsController.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const settingsRouter = express.Router();

// Route to get background color
settingsRouter.get("/get_color", adminAuthOptional, getSettings);

// Route to update background color
settingsRouter.post("/post_color", adminAuth, updateSettings);

export default settingsRouter;
