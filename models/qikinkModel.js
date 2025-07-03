import mongoose from "mongoose";

const qikinkOrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  id: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  orderDate: { type: Date, default: Date.now },
  orderStatus: { type: String, default: "Order Placed" },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  total: { type: Number },
});

const QikinkOrder =
  mongoose.models.QikinkOrder ||
  mongoose.model("QikinkOrder", qikinkOrderSchema);
export default QikinkOrder;
