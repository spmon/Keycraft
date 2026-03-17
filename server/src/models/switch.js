import { Schema, model } from 'mongoose';

const switchSchema = new Schema({
  manufacturer: Schema.Types.ObjectId,
  switch_type: String,
  actuation_force: Number,
}, {
  timestamps: true,
});

const Switch = model("Switch", switchSchema);

export {
  Switch
}