const mongoose = require("mongoose");
const citiesSchema = new mongoose.Schema(
  {
    countryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "country",
      required: true,
    },
    city_name: { type: String, required: true },
    population: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);
const City = mongoose.model("city", citiesSchema);
module.exports = City;
