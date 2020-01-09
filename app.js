const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const entriesRouter = require("./routes/entriesRouter");
const authRouter = require("./routes/authRouter");

// Set up mongoose connection
const getMongoDbUri = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.MONGODB_URI_PRODUCTION;
    default:
      return "mongodb://mongo:27017/retroflect_development";
  }
};
const mongoDB = getMongoDbUri();
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/entries", entriesRouter);
app.use("/api/auth", authRouter);

module.exports = app;
