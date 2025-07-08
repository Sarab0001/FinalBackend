import AboutUs from "../models/aboutUsModel.js";

export const getAboutUs = async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.json(aboutUs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addAboutUs = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    // Build the update object
    const update = {
      title,
      description,
    };
    if (image) update.image = image;

    // Upsert: find one, update it, or create if not exists
    const aboutUs = await AboutUs.findOneAndUpdate(
      {}, // No filter = match any existing one
      update,
      { new: true, upsert: true }
    );

    res.json({ message: "About Us saved successfully", data: aboutUs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
