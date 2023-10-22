const mongoose = require("mongoose");

var User = mongoose.model("User", {
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  nic_or_pass: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  country: { type: String, required: true },
  password: { type: String , required: true },
  privilege: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  }
});

module.exports = { User };
