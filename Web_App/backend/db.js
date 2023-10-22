const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

mongoose.connect(
  "mongodb://127.0.0.1:27017/ticket_db",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log("connection success!");
    } else {
      console.log("connection fail!" + JSON.stringify(err, undefined, 2));
    }
  }
);
