import Favorite from "../models/Favorite.js";
import mongoose from "mongoose";

// Add to favorite
export const addToFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

  
    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId required" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const response = await fetch(
      `https://dummyjson.com/products/${productId}`
    );

    if (!response.ok) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await response.json();

    // find user's favorite
    let favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      favorite = new Favorite({ userId, items: [] });
    }

    // check duplicate
    const exists = favorite.items.find(
      (item) => item.productId === product.id
    );

    if (exists) {
      return res.status(409).json({ message: "Already in favorites" });
    }

    // add product
    favorite.items.push({
      productId: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail
    });

    await favorite.save();

    res.status(201).json({
      message: "Added to favorites"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add favorite",
      error: error.message
    });
  }
};

// Get favorites
export const getFavorites = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    const favorite = await Favorite.findOne({ userId });

    res.status(200).json(favorite ? favorite.items : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove from favorite
export const removeFromFavorite = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).json({
        message: "userId and productId required"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid userId"
      });
    }

    const numericProductId = Number(productId);

    if (isNaN(numericProductId)) {
      return res.status(400).json({
        message: "Invalid productId"
      });
    }

    const favorite = await Favorite.findOne({ userId });

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found"
      });
    }

    const beforeCount = favorite.items.length;

    favorite.items = favorite.items.filter(
      (item) => item.productId !== numericProductId
    );

    if (favorite.items.length === beforeCount) {
      return res.status(404).json({
        message: "Product not in favorites"
      });
    }

    await favorite.save();

    res.status(200).json({
      message: "Removed from favorites"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove favorite",
      error: error.message
    });
  }
};
