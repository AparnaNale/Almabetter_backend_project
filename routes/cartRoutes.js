

import express from "express";
import { isAuthenticated } from "../Middleware/Auth.js"
import {
    addToCart,
    increaseQty,
    decreaseQty,
    getCartItems,
    removeFromCart,
    clearCart,
 
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/cart/add", isAuthenticated, addToCart);
router.post("/cart/increase", increaseQty);
router.post("/cart/decrease", decreaseQty);
router.get("/cart/:userId", getCartItems);
router.delete("/cart/remove", removeFromCart);
router.delete("/cart/clear", clearCart);


export default router;
