const express = require("express");
const Brand = require("../models/brands.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const brand = await Brand.find()
      .populate({ path: "product_ids", select: {} })
      .lean()
      .exec();
    return res.status(200).send({ brand, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    let check = await Brand.find({ brand_name: req.body.brand_name }).lean().exec();
    if (check) {
      // console.log(check)
      check[0].product_ids.push(req.body.product_ids);
      // console.log(check[0])
      check = await Brand.findByIdAndUpdate(check[0]._id, check[0], {
        new: true,
      });
      return res
        .status(200)
        .send({ check, status: true, message: "data added successfully" });
    }
    const brand = await Brand.create(req.body);
    return res
      .status(200)
      .send({ brand, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ brand, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
        
    const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ brand, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

module.exports = router;
