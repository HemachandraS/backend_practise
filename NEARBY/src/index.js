const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
const restaurantController = require("./controllers/restaurant.controller");
app.get("/", (req, res) => {
  try {
    res.status(200).send("welcome to NEARBY.com");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.use("/geo", restaurantController);

module.exports = app;
