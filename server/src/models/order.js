import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  user: Schema.Types.ObjectId,
  shipping_address: String,
  phone_number: String,
  status: String,
  units: [Schema.Types.ObjectId]
}, {
  timestamps: true,
});

const Order = model("Order", orderSchema);

export {
  Order
}