import express from "express";
import cors from "cors";
import { products } from "./data/products.js";

const app = express();

app.use(cors());
app.use(express.json());
/* ===============================
   GET /products
================================ */
app.get("/products", (req, res) => {
  let result = [...products];

  const { price_from, price_to, title, sort, sort_order = "ASC" } = req.query;

  if (price_from) {
    result = result.filter((p) => p.price_for_item >= Number(price_from));
  }

  if (price_to) {
    result = result.filter((p) => p.price_for_item <= Number(price_to));
  }

  if (title) {
    result = result.filter((p) =>
      p.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (sort === "PRICE") {
    result.sort((a, b) =>
      sort_order === "DESC"
        ? b.price_for_item - a.price_for_item
        : a.price_for_item - b.price_for_item
    );
  }

  res.json(result);
});

/* ===============================
   GET /products/:id
================================ */
app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

/* ===============================
   GET /similar-products?id=1
================================ */
app.get("/similar-products", (req, res) => {
  const productId = Number(req.query.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return res.json([]);
  }

  const similarProducts = products
    .filter((p) => p.id !== productId)
    .sort((a, b) => {
      const diffA = Math.abs(a.price_for_item - product.price_for_item);
      const diffB = Math.abs(b.price_for_item - product.price_for_item);
      return diffA - diffB;
    })
    .slice(0, 4);

  res.json(similarProducts);
});

/* ===============================
   HEALTH
================================ */
app.get("/health", (_, res) => {
  res.json({ ok: true });
});

const PORT = 9999;
app.listen(PORT, () => {
  console.log("🚀 Backend running on", PORT);
});
