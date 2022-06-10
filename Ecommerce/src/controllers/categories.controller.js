const express = require("express");
const  Category = require("../models/categories.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const category =await Category.find().lean()
    .exec();
      // .populate({ path: "product_ids", select: {} })
      
    return res.status(200).send({ category, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    const category =await Category.create(req.body);
    return res
      .status(200)
      .send({ category, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const category =await Category.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ category, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const category =await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ category, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

module.exports = router;
