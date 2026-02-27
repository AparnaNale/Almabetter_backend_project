import mongoose from "mongoose";

const favoriteItemSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    }
  },
  { _id: false }
);

const favoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    items: {
      type: [favoriteItemSchema],
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);
