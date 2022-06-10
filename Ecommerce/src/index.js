const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  try {
    res.status(200).send("welcome to E-Commerce-store.com");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
const usersController = require("./controllers/users.controller");
const productsController = require("./controllers/products.controller");
const brandsController = require("./controllers/brands.controller");
const categoriesController = require("./controllers/categories.controller");
const reviewsController = require("./controllers/reviews.controller");
const ordersController = require("./controllers/orders.controller");
app.use("/users", usersController);
app.use("/products", productsController);
app.use("/brands", brandsController);
app.use("/categories", categoriesController);
app.use("/reviews", reviewsController);
app.use("/orders", ordersController);
module.exports = app;
