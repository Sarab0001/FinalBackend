import express from "express";
import { getCarousel, addCarousel } from "../controllers/carouselController.js";
import adminAuth from "../middleware/adminAuth.js";
import adminAuthOptional from "../middleware/adminAuthOptional.js";

const carouselRouter = express.Router();

carouselRouter.get("/get_carousel", adminAuthOptional, getCarousel);
carouselRouter.post("/add_carousel", adminAuth, addCarousel);

export default carouselRouter;
