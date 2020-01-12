require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");

const authMiddleware = require("./lib/authMiddleware");
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

// set cors policy
const whitelist = ["http://localhost:3000", "http://retroflect.now.sh"];
const corsOptions = {
  origin(origin, callback) {
    // allow requests from whitelisted domains and devices e.g. rest clients, mobiles
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/entries", authMiddleware.authenticate, entriesRouter);
app.use("/api/auth", authRouter);

module.exports = app;
