// middleware/adminAuthOptional.js
import jwt from "jsonwebtoken";
import userAdminModel from "../models/userAdminModel.js";

const adminAuthOptional = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) return next(); // Public access fallback

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id || decoded.adminId;
    const adminUser = await userAdminModel.findById(userId);

    if (adminUser) {
      req.user = adminUser;
    }
  } catch (err) {
    console.log("⚠️ Token invalid, skipping adminAuthOptional");
  }
  next();
};

export default adminAuthOptional;
