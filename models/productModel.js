import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  name: { type: String, required: true },
  description: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  price: { type: Number, required: false },
  image: { type: Array, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  sizes: { type: Array, required: true },
  bestseller: { type: Boolean },
  date: { type: Number, required: true },
  sizeChart: {
    type: [mongoose.Schema.Types.Mixed],
    default: [],
  },
  careInstructions: {
    type: [String],
    default: [],
  },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
