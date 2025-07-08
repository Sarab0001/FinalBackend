import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  tel: String,
  email: String,
});
const ContactUs = mongoose.model("contactUs", contactUsSchema);
export default ContactUs;
