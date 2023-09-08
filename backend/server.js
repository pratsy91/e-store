import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import products from "./data/products.js";
dotenv.config();
const port = process.env.PORT || 5000;

const app = express();
app.get(cors());
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
