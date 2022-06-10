const express = require("express");
const User = require("../models/users.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.status(200).send({ user, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.post("/create", async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res
      .status(200)
      .send({ user, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ user, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.patch("/:id/edit", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .send({ user, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.get("/:id/addresses", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean().exec();
    return res.status(200).send({ addresses: user.addresses, status: true });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.post("/:id/addresses/create", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { addresses: { ...req.body } } },
      { new: true }
    );
    return res
      .status(200)
      .send({ user, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});

router.patch("/:id/addresses/:idx/edit", async (req, res) => {
  // console.log(req.params.id, req.params.idx, req.body);
  try {
    let prev = await User.find({ _id: req.params.id }).lean().exec();
    let add = prev[0].addresses.filter((ele) =>ele._id == req.params.idx)
    // console.log({...add[0],...req.body});
    const user = await User.updateOne(
      { _id: req.params.id, "addresses._id": req.params.idx },
      {
        $set: { "addresses.$": {...add[0],...req.body} },
      },
      {
        new: true,
      }
    );
    return res
      .status(200)
      .send({ user, status: true, message: "data added successfully" });
  } catch (error) {
    return res.status(400).send({ error: error.message, status: false });
  }
});
// router.get("/:id/addresses/:idx/edit", async (req, res) => {
//   try {
//     const user = await User.findOne( );
//     return res
//       .status(200)
//       .send({ user, status: true, message: "data added successfully" });
//   } catch (error) {
//     return res.status(400).send({ error: error.message, status: false });
//   }
// });
module.exports = router;
