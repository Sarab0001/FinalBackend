import mongoose from "mongoose";

const modifyUiSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "useradmin",
      required: true,
    }, // 🔑 Link to Admin
    logo_img: { type: String },
    hero_img: { type: String },
  },
  { timestamps: true }
);

const modifyUiModel = mongoose.model("modifyUi", modifyUiSchema);
export default modifyUiModel;
