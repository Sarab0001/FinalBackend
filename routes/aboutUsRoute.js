import express from "express";
import {
  addAboutUs,
  getAboutUs,
  editAboutUs,
} from "../controllers/aboutUsController.js";
import upload from "../middleware/upload.js";

const aboutUsRouter = express.Router();

aboutUsRouter.get("/get_aboutUs", getAboutUs);
aboutUsRouter.post("/add_aboutUs", upload.single("image"), addAboutUs);
aboutUsRouter.put("/edit_aboutUs/:id", upload.single("image"), editAboutUs);

export default aboutUsRouter;
