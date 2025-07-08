import express from "express";
import {
  addContactUs,
  getContactUs,
} from "../controllers/contactUsController.js";
import upload from "../middleware/upload.js";

const contactUsRouter = express.Router();

contactUsRouter.get("/get_contactUs", getContactUs);
contactUsRouter.post("/add_contactUs", upload.single("image"), addContactUs);

export default contactUsRouter;
