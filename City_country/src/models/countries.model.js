const mongoose = require("mongoose");
const countriesSchema = new mongoose.Schema(
  {
    country_name: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);
const Country = mongoose.model("country", countriesSchema);
module.exports = Country;
