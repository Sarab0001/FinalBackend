import footerModel from "../models/footerModel.js";

export const addFooter = async (req, res) => {
  const { description, number, email, address, social, copyright } = req.body;
  try {
    let footer = await footerModel.findOne({ adminId: req.user._id });

    if (!footer) {
      footer = new footerModel({ adminId: req.user._id });
    }

    footer.description = description;
    footer.number = number;
    footer.email = email;
    footer.address = address;
    footer.social = social;
    footer.copyright = copyright;

    await footer.save();

    res.json({ success: true, data: footer });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getFooter = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id;
    } else if (req.query.adminId) {
      adminId = req.query.adminId;
    } else {
      return res.status(400).json({
        success: false,
        message: "Admin ID is required",
      });
    }
    const footer = await footerModel.findOne({ adminId });
    if (!footer) {
      return res.status(404).json({
        success: false,
        message: "Footer not found",
      });
    }
    res.json({ success: true, data: footer });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
