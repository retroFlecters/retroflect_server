const mongoose = require("mongoose");

const { Schema } = mongoose;

const EntrySchema = new Schema(
  {
    entryDate: { type: Date, required: true },
    diary: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Entry", EntrySchema);
