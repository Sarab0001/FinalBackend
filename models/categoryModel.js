import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "useradmin",
    required: true,
  }, // 🔑 Link to Admin
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

export default Category;
