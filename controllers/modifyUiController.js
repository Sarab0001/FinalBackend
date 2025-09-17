import { v2 as cloudinary } from "cloudinary";
import modifyUiModel from "../models/modifyUiModel.js";

// ADD LOGO
export const addLogo = async (req, res) => {
  try {
    const logo = req.files?.logo_img?.[0];
    if (!logo)
      return res
        .status(400)
        .json({ success: false, message: "Logo file missing" });

    const result = await cloudinary.uploader.upload(logo.path, {
      resource_type: "image",
    });

    let uiData = await modifyUiModel.findOne({ adminId: req.user._id });
    if (uiData) {
      uiData.logo_img = result.secure_url;
    } else {
      uiData = new modifyUiModel({
        logo_img: result.secure_url,
        adminId: req.user._id,
      });
    }

    await uiData.save();
    res.json({ success: true, message: "Logo Added", data: uiData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ADD HERO IMAGE
export const addHeroImage = async (req, res) => {
  try {
    const hero = req.files?.hero_img?.[0];
    if (!hero)
      return res
        .status(400)
        .json({ success: false, message: "Hero image file missing" });

    const result = await cloudinary.uploader.upload(hero.path, {
      resource_type: "image",
    });

    let uiData = await modifyUiModel.findOne({ adminId: req.user._id });
    if (uiData) {
      uiData.hero_img = result.secure_url;
    } else {
      uiData = new modifyUiModel({
        hero_img: result.secure_url,
        adminId: req.user._id,
      });
    }

    await uiData.save();
    res.json({ success: true, message: "Hero Image Added", data: uiData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET LOGO
export const getLogo = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From query parameter
    } else {
      return res.status(400).json({
        message: "Admin ID is required to fetch logo",
      });
    }
    const data = await modifyUiModel.findOne({ adminId });
    if (!data) {
      return res.status(404).json({
        message: "Logo not found",
      });
    }
    res.json({ success: true, logo_img: data?.logo_img || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET HERO IMAGE
export const getHeroImage = async (req, res) => {
  try {
    let adminId;
    if (req.user?._id) {
      adminId = req.user._id; // From verified token
    } else if (req.query.adminId) {
      adminId = req.query.adminId; // From query parameter
    } else {
      return res.status(400).json({
        message: "Admin ID is required to fetch hero image",
      });
    }
    const data = await modifyUiModel.findOne({ adminId });
    if (!data) {
      return res.status(404).json({
        message: "Hero image not found",
      });
    }
    res.json({ success: true, hero_img: data?.hero_img || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
