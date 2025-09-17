import mongoose from "mongoose";

const userAdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    storeName: { type: String, required: true },
    domain: { type: String, required: true },
    subscription: {
      startDate: { type: Date },
      endDate: { type: Date },
      isActive: { type: Boolean, default: false },
    },
  },
  { minimize: false }
);

const userAdminModel =
  mongoose.models.useradmin || mongoose.model("useradmin", userAdminSchema);

export default userAdminModel;
