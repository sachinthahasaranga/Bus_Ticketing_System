const mongoose = require("mongoose");

var Account = mongoose.model("Account", {
  userId: { type: String, required: true },
  balance: { type: Number, required: true }
});

module.exports = { Account };
