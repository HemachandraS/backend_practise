const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: [{ type: String, required: false}],
    addresses: [
      {
        line_1: { type: String, required: true },
        line_2: { type: String, required: false },
        state: { type: String, required: true },
        country: { type: String, required: true, default: "india" },
        pin_code: { type: String, required: true },
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
module.exports = User;
