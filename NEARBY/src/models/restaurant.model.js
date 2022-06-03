const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    location: {},
  },
  {
    versionKey: false,
    timestamps: false,
  }
);
const Restaurant = mongoose.model("restaurant", restaurantSchema);

module.exports = Restaurant;
