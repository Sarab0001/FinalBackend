import mongoose from "mongoose";

const qikinkOrderSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  orderDate: { type: Date },
  orderStatus: { type: String },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }],
  total: { type: Number },
});
const QikinkOrder = mongoose.model("QikinkOrder", qikinkOrderSchema);
export default QikinkOrder;
