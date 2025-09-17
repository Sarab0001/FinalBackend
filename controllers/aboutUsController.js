import AboutUs from "../models/aboutUsModel.js";

export const getAboutUs = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From frontend query
    } else {
      return res.status(400).json({
        message: "Admin ID is required",
      });
    }
    console.log("🔐 getAboutUs req.user:", req.user);

    const aboutUs = await AboutUs.findOne({ adminId });
    if (!aboutUs) {
      return res.status(404).json({
        message: "About Us not found",
      });
    }
    res.json(aboutUs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const update = { title, description, adminId: req.user._id };
    if (image) update.image = image;

    const aboutUs = await AboutUs.findOneAndUpdate(
      { adminId: req.user._id },
      update,
      { new: true, upsert: true }
    );

    res.json({ message: "About Us saved successfully", data: aboutUs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
