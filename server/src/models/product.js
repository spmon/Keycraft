import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  price: Number,
  discounted: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0.0,
  },
  total_rating: {
    type: Number,
    default: 0.0,
  },
  stock: Number,
  comments: [Schema.Types.ObjectId],
  images: [String],
  description: String,
  category: String,
  specs: Schema.Types.ObjectId,
}, {
  timestamps: true,
});

const Product = model("Product", productSchema);

export {
  Product
}