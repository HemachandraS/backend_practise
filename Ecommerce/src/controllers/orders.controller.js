const express = require("express");
const Order = require("../models/orders.model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const order = await Order.find()
      .populate({ path: "product_ids", select: {} })
      .populate({ path: "user_ids", select: {} })
      .lean()
      .exec();
    return res.status(200).send({ order, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    let check = await Order.find({ user_ids: req.body.user_ids }).lean().exec();
    if (check) {
      // console.log(check)
      check[0].product_ids.push(req.body.product_ids);
      // console.log(check[0])
      check = await Order.findByIdAndUpdate(check[0]._id, check[0], {
        new: true,
      });
      return res
        .status(200)
        .send({ check, status: true, message: "data added successfully" });
    }
    const order = await Order.create(req.body);
    return res
      .status(200)
      .send({ order, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ order, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ order, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

module.exports = router;
