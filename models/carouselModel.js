import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  carousel: {
    type: String,
  },
  show: {
    type: Boolean,
  },
});
const Carousel = mongoose.model("Carousel", carouselSchema);
export default Carousel;
