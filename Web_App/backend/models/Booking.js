const mongoose = require("mongoose");

var Booking = mongoose.model("Booking", {
  userId: { type: String, required: true },
  routeId: { type: String, required: true },
  no_of_tickets: { type: Number, required: true }
});

module.exports = { Booking };
