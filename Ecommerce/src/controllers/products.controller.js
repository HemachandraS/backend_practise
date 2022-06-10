const express = require("express");
const Product = require("../models/products.model");
const Category = require("../models/categories.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const product = await Product.find()
      .populate({ path: "category_ids", select: {} })
      .lean()
      .exec();
    return res.status(200).send({ product, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    const ct = await Category.findByIdAndUpdate(
      req.body.category_ids,
      { $push: { product_ids: product._id } },
     
      {
        new: true,
      }
    );
    return res
      .status(200)
      .send({ product, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ product, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ product, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

module.exports = router;
