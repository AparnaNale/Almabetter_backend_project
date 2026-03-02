import express from "express";
import {
  addToFavorite,
  getFavorites,
  removeFromFavorite
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/favorite", addToFavorite);
router.get("/favorite/:userId", getFavorites);
router.delete("/favorite/:userId/:productId", removeFromFavorite);

export default router;
