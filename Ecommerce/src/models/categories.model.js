const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true },

    product_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const Category = mongoose.model("category", categorySchema);
module.exports = Category;
