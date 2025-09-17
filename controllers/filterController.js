// controllers/filterController.js
import mongoose from "mongoose";

export const filterData = async (req, res) => {
  const { collection, filter = {} } = req.body;

  if (!collection) {
    return res.status(400).json({ error: "Collection name is required" });
  }

  try {
    const Model = mongoose.model(collection); // Get Mongoose model by name

    if (!Model) {
      return res.status(400).json({ error: "Invalid collection name" });
    }

    const data = await Model.find(filter); // You can add projection, limit, etc.
    return res.json(data);
  } catch (err) {
    console.error("Error fetching data:", err.message);
    return res.status(500).json({ error: "Server error" });
  }
};
