import ContactUs from "../models/contactUsModel.js";

export const getContactUs = async (req, res) => {
  try {
    let adminId;

    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From frontend query
    } else {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }

    const contactUs = await ContactUs.findOne({ adminId });

    if (!contactUs) {
      return res.status(404).json({
        success: false,
        message: "Contact Us not found",
      });
    }

    res.json(contactUs);
  } catch (err) {
    console.error("❌ getContactUs error:", err.message);
    res.status(500).json({ message: err.message });
  }
};

export const addContactUs = async (req, res) => {
  try {
    const { title, description, email, tel } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const update = {
      adminId: req.user._id,
      title,
      description,
      email,
      tel,
    };
    if (image) update.image = image;

    const contactUs = await ContactUs.findOneAndUpdate(
      { adminId: req.user._id },
      update,
      { new: true, upsert: true }
    );
    res.json({ message: "Contact Us Saved successfully", data: contactUs });
  } catch (err) {
    console.error("❌ addContactUs error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
