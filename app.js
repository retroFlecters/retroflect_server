require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authMiddleware = require("./lib/authMiddleware");
const entriesRouter = require("./routes/entriesRouter");
const authRouter = require("./routes/authRouter");

// Set up mongoose connection
const getMongoDbUri = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      // needs to be set in host environment for deployment
      return process.env.MONGODB_URI_PRODUCTION;
    case "test":
      return "mongodb://mongo:27017/retroflect_test";
    default:
      return "mongodb://mongo:27017/retroflect_development";
  }
};

mongoose.connect(getMongoDbUri(), {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/entries", authMiddleware.authenticate, entriesRouter);
app.use("/api/auth", authRouter);

module.exports = app;
