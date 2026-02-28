import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import userRoutes from "./routes/user.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./swagger-output.json" with { type: "json" };



const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is live 🚀",
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// routes
app.use("/", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", favoriteRoutes);
app.use("/api/user", userRoutes);

export default app;
