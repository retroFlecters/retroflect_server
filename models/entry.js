/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const EntrySchema = new Schema(
  {
    entryDate: { type: Date, required: true },
    diary: String
  },
  { timestamps: true }
);

EntrySchema.set("toJSON", {
  // remove the __v property from the json representation
  versionKey: false,
  // replace the "_id" key with "id" and convert value to string
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model("Entry", EntrySchema);
