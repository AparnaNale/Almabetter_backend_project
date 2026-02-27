import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: Number, // dummyjson id
    required: true
  },
  title: String,
  price: Number,   // single product price
  image: String,
  quantity: {
    type: Number,
    default: 1
  },
  totalPrice: Number  // price * quantity
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  items: [cartItemSchema]
});

export default mongoose.model("Cart", cartSchema);

