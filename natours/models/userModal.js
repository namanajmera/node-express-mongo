const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the name"],
    },
    email: {
      type: String,
      required: [true, "Please provide the email id."],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    photo: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please provide the password"],
      minlength: 8,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide the password"],
      minlength: 8,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
