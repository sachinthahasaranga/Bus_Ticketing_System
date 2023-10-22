const mongoose = require("mongoose");

var Route = mongoose.model("Route", {
  name: { type: String, required: true },
  vehicle_num: { type: String, required: true },
  driver: { type: String, required: true },
  time: { type: String, required: true },
  date: { type: String, required: true },
  price: { type: Number, required: true },
  descrption: { type: String, required: true }
});

module.exports = { Route };
