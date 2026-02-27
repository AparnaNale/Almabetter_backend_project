import express from "express";
import { getAllProducts, getProductsByCategory } from "../controllers/productController.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:category", getProductsByCategory);

export default router;
