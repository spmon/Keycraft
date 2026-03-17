import { Schema, model } from 'mongoose';

const kitSchema = new Schema({
  manufacturer: Schema.Types.ObjectId,
  case_color: String,
  structure: String,
}, {
  timestamps: true,
});

const Kit = model("Kit", kitSchema);

export {
  Kit
}