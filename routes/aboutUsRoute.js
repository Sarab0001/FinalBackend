import express from "express";
import { addAboutUs, getAboutUs } from "../controllers/aboutUsController.js";
import upload from "../middleware/upload.js";

const aboutUsRouter = express.Router();

aboutUsRouter.get("/get_aboutUs", getAboutUs);
aboutUsRouter.post("/add_aboutUs", upload.single("image"), addAboutUs);

export default aboutUsRouter;
