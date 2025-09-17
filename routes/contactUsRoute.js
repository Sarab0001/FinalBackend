import express from "express";
import {
  addContactUs,
  getContactUs,
} from "../controllers/contactUsController.js";
import upload from "../middleware/upload.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const contactUsRouter = express.Router();

contactUsRouter.get("/get_contactUs", adminAuthOptional, getContactUs);
contactUsRouter.post(
  "/add_contactUs",
  (req, res, next) => {
    console.log("🚦Router received POST /add_contactUs");
    console.log("🧾 Headers received:", req.headers);
    next();
  },
  adminAuth,
  upload.single("image"),
  addContactUs
);

export default contactUsRouter;
