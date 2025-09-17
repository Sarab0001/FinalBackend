import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  backgroundColor: {
    type: String,
    default: "#ffffff",
  },
});

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
