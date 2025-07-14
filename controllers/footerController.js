import footerModel from "../models/footerModel.js";

// UPDATE FOOTER
export const addFooter = async (req, res) => {
  const { description, number, email, address, social, copyright } = req.body;

  try {
    const footer = await footerModel.findOne(); // Get the existing footer document

    if (!footer) {
      return res.json({ success: false, message: "Footer not found" });
    }

    // Update the existing fields
    footer.description = description;
    footer.number = number;
    footer.email = email;
    footer.address = address;
    footer.social = social;
    footer.copyright = copyright;

    await footer.save();

    res.json({ success: true, message: "Footer updated", data: footer });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// GET FOOTER
export const getFooter = async (req, res) => {
  try {
    const footer = await footerModel.find();
    res.json({ success: true, data: footer });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
