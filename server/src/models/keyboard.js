import { Schema, model } from 'mongoose';

const keyboardSchema = new Schema({
  manufacturer: Schema.Types.ObjectId,
  size: String,
  case_color: String,
  switch_type: String,
  actuation_force: Number,
  switch_manufacturer: Schema.Types.ObjectId,
}, {
  timestamps: true,
});

const Keyboard = model("Keyboard", keyboardSchema);

export {
  Keyboard
}