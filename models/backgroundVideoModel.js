import mongoose from "mongoose";

const BackgroundVideoSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "useradmin",
      required: true,
    }, // 🔑 Link to Admin
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const BackgroundVideo = mongoose.model(
  "BackgroundVideo",
  BackgroundVideoSchema
);
export default BackgroundVideo;
