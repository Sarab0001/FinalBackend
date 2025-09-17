// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "useradmin",
      required: true,
    }, // 🔑 Link to Admin
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
    subscription: {
      startDate: { type: Date },
      endDate: { type: Date },
      isActive: { type: Boolean, default: false },
    },
  },
  { minimize: false }
);

// ✅ Correct way to avoid model overwrite issue
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
