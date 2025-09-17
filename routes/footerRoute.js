import express from "express";
import { addFooter, getFooter } from "../controllers/footerController.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";
const footerRouter = express.Router();

// GET FOOTER
footerRouter.post("/post_footer", adminAuth, addFooter);
footerRouter.get("/get_footer", adminAuthOptional, getFooter);

export default footerRouter;
