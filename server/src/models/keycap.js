import { Schema, model } from 'mongoose';

const keycapSchema = new Schema({
  manufacturer: Schema.Types.ObjectId,
  material: String,
  profile: String,
}, {
  timestamps: true,
});

const Keycap = model("Keycap", keycapSchema);

export {
  Keycap
}