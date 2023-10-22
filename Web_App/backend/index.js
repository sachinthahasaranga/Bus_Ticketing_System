require("./db.js");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var AccountRoutes = require("./controllers/AccountController")
var BookingRoutes = require("./controllers/BookingController")
var RouteRoutes = require("./controllers/RouteController")
var UserRoutes = require("./controllers/UserController")

var app = express()
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }))
app.listen(3500, () => console.log("Server started at : 3500"))

app.use("/Account", AccountRoutes)
app.use("/Booking", BookingRoutes)
app.use("/Route", RouteRoutes)
app.use("/User", UserRoutes)

app.use(express.static("public"))
