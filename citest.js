const mongoose = require("mongoose");

// Set up mongoose connection
const getMongoDbUri = () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return process.env.MONGODB_URI_PRODUCTION;
    default:
      return "mongodb://mongo:27017/retroflect_test";
  }
};
const mongoDB = getMongoDbUri();
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

db.once("open", () => {
  console.log(db);
  console.log("MongoDB connection success");
  console.log(process.env.NODE_ENV);
  db.close();
});
