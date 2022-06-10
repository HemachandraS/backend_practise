const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: [{ type: String, required: true }],
    product_ids: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    user_ids: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    }],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Review = mongoose.model("review", reviewSchema);
module.exports = Review;
