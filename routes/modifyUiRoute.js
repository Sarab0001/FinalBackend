import express from "express";
import {
  addHeroImage,
  addLogo,
  getLogo,
  getHeroImage,
} from "../controllers/modifyUiController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const modifyUiRouter = express.Router();

// File upload routes
modifyUiRouter.post(
  "/upload_logo",
  adminAuth,
  upload.fields([{ name: "logo_img" }]),
  addLogo
);
modifyUiRouter.post(
  "/upload_hero",
  adminAuth,
  upload.fields([{ name: "hero_img" }]),
  addHeroImage
);

// Get routes
modifyUiRouter.get("/get_logo", adminAuthOptional, getLogo);
modifyUiRouter.get("/get_hero", adminAuthOptional, getHeroImage);

export default modifyUiRouter;
