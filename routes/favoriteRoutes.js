import express from "express";
import { isAuthenticated } from "../middleware/Auth.js"
import {
  addToFavorite,
  getFavorites,
  removeFromFavorite
} from "../controllers/favoriteController.js";

const router = express.Router();

router.post("/favorite", isAuthenticated, addToFavorite);
router.get("/favorite/:userId",isAuthenticated, getFavorites);
router.delete("/favorite/remove/:userId/:productId",isAuthenticated, removeFromFavorite);

export default router;
