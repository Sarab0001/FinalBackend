import BackgroundVideo from "../models/backgroundVideoModel.js";
import fs from "fs";

export const getBackgroundVideos = async (req, res) => {
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
    console.log("🔐 getBackgroundVideos req.user:", req.user);
    const backgroundVideos = await BackgroundVideo.find({ adminId });
    if (!backgroundVideos) {
      return res.status(404).json({
        message: "No background videos found",
      });
    }
    res.status(200).json(backgroundVideos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching background videos" });
  }
};

export const addBackgroundVideo = async (req, res) => {
  try {
    const { name } = req.body;
    const file = req.file;
    const adminId = req.user._id;

    if (!name || !file) {
      return res
        .status(400)
        .json({ message: "Name and video file are required" });
    }

    const url = `/uploads/videos/${file.filename}`;
    const existingVideo = await BackgroundVideo.findOne({ adminId });

    if (existingVideo) {
      const oldVideoPath = `uploads/videos/${existingVideo.url
        .split("/")
        .pop()}`;
      if (fs.existsSync(oldVideoPath)) fs.unlinkSync(oldVideoPath);

      existingVideo.name = name;
      existingVideo.url = url;
      await existingVideo.save();

      return res.status(200).json({ success: true, data: existingVideo });
    }

    const newBackgroundVideo = new BackgroundVideo({ name, url, adminId });
    await newBackgroundVideo.save();

    res.status(201).json({ success: true, data: newBackgroundVideo });
  } catch (error) {
    res.status(500).json({ message: "Error uploading background video" });
  }
};
