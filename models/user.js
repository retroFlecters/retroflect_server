/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String, required: true }
  },
  { timestamps: true }
);

UserSchema.set("toJSON", {
  // remove the __v property from the json representation
  versionKey: false,
  // replace the "_id" key with "id" and convert value to string
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.passwordHash;
  }
});

module.exports = mongoose.model("User", UserSchema);
