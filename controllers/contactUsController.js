import ContactUs from "../models/contactUsModel.js";

export const getContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUs.find();
    res.json(contactUs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addContactUs = async (req, res) => {
  try {
    const { title, description, email, tel } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const update = {
      title,
      description,
      email,
      tel,
    };
    if (image) update.image = image;

    const contactUs = await ContactUs.findOneAndUpdate({}, update, {
      new: true,
      upsert: true,
    });
    res.json({ message: "Contact Us Saved successfully", data: contactUs });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
