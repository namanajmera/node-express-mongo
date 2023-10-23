const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please provide the password"],
      minlength: 8,
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: "Password Should be the same.",
      },
    },
    passwordChangedAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  // Only run this function when password is actually modified
  if (!this.isModified("password")) return next();

  // Hash the password ith cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete the Password Confirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changeAt = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changeAt;
  }

  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
