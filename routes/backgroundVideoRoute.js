import express from "express";
import {
  getBackgroundVideos,
  addBackgroundVideo,
} from "../controllers/backgrondVideoController.js";
import upload from "../middleware/upload.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const backgroundVideoRouter = express.Router();

// Route to get the background video
backgroundVideoRouter.get("/get_video", adminAuthOptional, getBackgroundVideos);

// Route to add a new background video
backgroundVideoRouter.post(
  "/add_video",
  adminAuth,
  upload.single("video"),
  addBackgroundVideo
);

export default backgroundVideoRouter;
