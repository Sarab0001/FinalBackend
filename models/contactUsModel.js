import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  title: String,
  description: String,
  image: String,
  tel: String,
  email: String,
});
const ContactUs = mongoose.model("contactUs", contactUsSchema);
export default ContactUs;
