import mongoose from "mongoose";

const footerSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  description: String,
  number: String,
  email: String,
  address: String,
  social: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
  },
  copyright: String,
});
const footerModel =
  mongoose.models.footer || mongoose.model("footer", footerSchema);
export default footerModel;
