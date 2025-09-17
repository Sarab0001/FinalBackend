import userModel from "../models/userModel.js";

const checkSubscription = async (req, res, next) => {
  try {
    const user = req.user; // Comes from authUser middleware

    if (!user || !user.subscription) {
      return res.status(403).json({
        success: false,
        message: "No subscription found. Please subscribe to access the store.",
      });
    }

    const { isActive, endDate } = user.subscription;

    if (!isActive) {
      return res.status(403).json({
        success: false,
        message: "Subscription inactive. Please subscribe to access the store.",
      });
    }

    const now = new Date();
    const expiry = new Date(endDate);

    if (expiry < now) {
      user.subscription.isActive = false;
      await user.save();
      return res.status(403).json({
        success: false,
        message: "Subscription expired. Please renew to access the store.",
      });
    }

    // Calculate days left
    const remainingDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
    req.subscriptionRemainingDays = remainingDays;

    next();
  } catch (error) {
    console.error(`[Subscription ❌] Error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server error during subscription check.",
    });
  }
};

export default checkSubscription;
