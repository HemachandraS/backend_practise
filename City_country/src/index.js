const express = require("express");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors())
const countryController = require("./controllers/countries.controller")
const cityController = require("./controllers/cities.controller")
app.get("/", (req, res) => {
  try {
    res.status(200).send("welcome to CITY COUNTRY.com");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.use('/add-country',countryController)
app.use('/add-city',cityController )

module.exports = app;
