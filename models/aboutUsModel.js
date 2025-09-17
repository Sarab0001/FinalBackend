import mongoose from "mongoose";

const aboutUsSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  title: String,
  description: String,
  image: String,
});
const AboutUs = mongoose.model("AboutUs", aboutUsSchema);
export default AboutUs;
