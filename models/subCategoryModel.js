import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
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

const SubCategory = mongoose.model("SubCategory", SubCategorySchema);

export default SubCategory;
