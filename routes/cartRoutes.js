

import express from "express";
import { isAuthenticated } from "../middleware/Auth.js"
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
router.post("/cart/increase", isAuthenticated,  increaseQty);
router.post("/cart/decrease", isAuthenticated,  decreaseQty);
router.get("/cart/:userId", isAuthenticated,  getCartItems);
// router.delete("/cart/remove", isAuthenticated,  removeFromCart);
// router.delete("/cart/clear", isAuthenticated,  clearCart);
router.delete("/remove/:userId/:productId", removeFromCart);

router.delete("/clear/:userId", clearCart);



export default router;
