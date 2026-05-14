const express = require("express");

const path = require("path");

const mongoose = require("mongoose");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const expressLayouts = require("express-ejs-layouts");

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cookieParser());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(expressLayouts);

app.set("layout", "layouts/main");

app.use("/", require("./routes/index.route"));

module.exports = app;
