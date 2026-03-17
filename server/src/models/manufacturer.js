import { Schema, model } from "mongoose"

const manufacturerSchema = new Schema({
  name: String,
  category: String,
});

const Manufacturer = model("Manufacturer", manufacturerSchema);

export {
  Manufacturer
}