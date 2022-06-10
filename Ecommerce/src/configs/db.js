const mongoose = require("mongoose");
const connect = () => {
  return mongoose.connect(
    "mongodb+srv://muralimv:1234@masaiassignments.vt3o0.mongodb.net/E-Commerce?retryWrites=true&w=majority"
  );
};
module.exports = connect;
