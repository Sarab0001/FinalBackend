// routes/filterRoute.js
import express from "express";
import { filterData } from "../controllers/filterController.js";

const filterRouter = express.Router();

filterRouter.post("/filter", filterData);

export default filterRouter;
