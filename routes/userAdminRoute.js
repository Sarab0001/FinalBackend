import express from "express";
import {
  adminLogin,
  registerAdminUser,
} from "../controllers/userAdminController.js";

const userAdminRouter = express.Router();

userAdminRouter.post("/register-admin", registerAdminUser);
userAdminRouter.post("/admin", adminLogin);

export default userAdminRouter;
