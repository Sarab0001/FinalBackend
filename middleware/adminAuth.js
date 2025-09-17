import jwt from "jsonwebtoken";
import userAdminModel from "../models/userAdminModel.js";

const adminAuth = async (req, res, next) => {
  console.log("🛡️ adminAuth middleware triggered");

  try {
    const token = req.headers.token;
    console.log("🪙 Received token:", token);

    if (!token) {
      console.log("❌ No token found in headers");
      return res.status(401).json({
        success: false,
        message: "Not Authorized, Token Missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    const userId = decoded.id || decoded.adminId;
    console.log("🔍 Extracted user ID from token:", userId);

    const adminUser = await userAdminModel.findById(userId);
    console.log("🔐 Found admin user:", adminUser?.email || "Not Found");

    if (!adminUser) {
      return res.status(404).json({
        success: false,
        message: "Admin User not found",
      });
    }

    req.user = adminUser;
    next();
  } catch (error) {
    console.error("❌ Error in adminAuth:", error.message);
    return res.status(401).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

export default adminAuth;
