import express from "express";
import userAdminModel from "../models/userAdminModel.js";
import adminAuth from "../middleware/adminAuth.js"; // JWT middleware

const subscriptionRouter = express.Router();

// GET subscription status
subscriptionRouter.get("/status", adminAuth, async (req, res) => {
  try {
    const user = await userAdminModel.findById(req.user.id);
    if (!user || !user.subscription) {
      return res.json({
        success: false,
        message: "No subscription data found.",
      });
    }

    const now = new Date();
    const expiry = new Date(user.subscription.endDate);
    const remaining = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    res.json({
      success: true,
      isActive: user.subscription.isActive,
      daysLeft: remaining > 0 ? remaining : 0,
    });
  } catch (error) {
    console.error("Subscription status error:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST: Activate or update subscription
subscriptionRouter.post("/activate", async (req, res) => {
  try {
    const { adminId, startDate, endDate } = req.body;

    if (!adminId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "adminId, startDate and endDate are required.",
      });
    }

    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start < now.setHours(0, 0, 0, 0)) {
      return res.status(400).json({
        success: false,
        message: "Start date cannot be a past date.",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date.",
      });
    }

    const user = await userAdminModel.findById(adminId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found." });
    }

    user.subscription = {
      startDate: start,
      endDate: end,
      isActive: true,
    };

    await user.save();

    res.json({
      success: true,
      message: "Subscription updated successfully.",
      subscription: user.subscription,
    });
  } catch (err) {
    console.error("Subscription activation error:", err.message);
    res.status(500).json({
      success: false,
      message: "Could not activate subscription.",
    });
  }
});

export default subscriptionRouter;
