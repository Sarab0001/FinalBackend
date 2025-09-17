import Settings from "../models/Settings.js";

// Get settings for the logged-in admin
const getSettings = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id;
    } else if (req.query.adminId) {
      adminId = req.query.adminId;
    } else {
      return res.status(400).json({
        error: "Admin ID is required",
      });
    }

    let settings = await Settings.findOne({ adminId });
    if (!settings) {
      return res.status(404).json({
        error: "Settings not found for this admin",
      });
    }
    if (!settings) {
      settings = await Settings.create({ adminId });
    }
    res.json({ backgroundColor: settings.backgroundColor });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update background color for the logged-in admin
const updateSettings = async (req, res) => {
  const { backgroundColor } = req.body;
  try {
    let settings = await Settings.findOne({ adminId: req.user._id });

    if (!settings) {
      settings = await Settings.create({
        adminId: req.user._id,
        backgroundColor,
      });
    } else {
      settings.backgroundColor = backgroundColor;
      await settings.save();
    }

    res.json({ message: "Background color updated", backgroundColor });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export { getSettings, updateSettings };
