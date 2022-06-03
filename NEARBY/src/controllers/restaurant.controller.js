const express = require("express");
const router = express.Router();
const Restaurant = require("../models/restaurant.model");
router.get("/", async (req, res) => {
  try {
    const restaurant = await Restaurant.find().lean().exec();
    return res.status(200).send(restaurant);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    return res.status(200).send(restaurant);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    return res.status(200).send(restaurant);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    return res.status(200).send(restaurant);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

module.exports = router;
