import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});
const AboutUs = mongoose.model("AboutUs", aboutUsSchema);
export default AboutUs;
