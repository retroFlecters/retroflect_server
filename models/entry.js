const mongoose = require("mongoose");

const { Schema } = mongoose;

const EntrySchema = new Schema({
  entryDate: Date,
  diary: String
});

module.exports = mongoose.model("Entry", EntrySchema);
