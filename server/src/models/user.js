import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  phone_number: String,
  address: String,
  password: String,
  role: Boolean
}, {
  timestamps: true,
});

const User = model('User', userSchema);

export {
  User
}