import { Schema, model } from "mongoose";

const orderUnitSchema = new Schema({
  product: Schema.Types.ObjectId,
  quantity: Number,
}, {
  timestamps: true,
});

const OrderUnit = model("OrderUnit", orderUnitSchema);

export {
  OrderUnit
}