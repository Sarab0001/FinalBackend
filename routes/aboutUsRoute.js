import express from "express";
import { addAboutUs, getAboutUs } from "../controllers/aboutUsController.js";
import upload from "../middleware/upload.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const aboutUsRouter = express.Router();

aboutUsRouter.get("/get_aboutUs", adminAuthOptional, getAboutUs);
aboutUsRouter.post(
  "/add_aboutUs",
  adminAuth,
  upload.single("image"),
  addAboutUs
);

export default aboutUsRouter;
