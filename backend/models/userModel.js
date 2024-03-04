const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter name"],
    maxLength: [30, "name should be of 30 characters"],
    minLength: [4, "name should not less than 4 characters"],
  },
  email: {
    type: String,
    required: [true, "please enter email"],
    validator: [validator.isEmail, "please enter a valid email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please enter your password"],
    minLength: [8, "password should have more than 8 characters"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.methods.getPasswordResetToken = function () {
  //generate token
  const resetToken = crypto.randomBytes(20).toString("hex");
  //store in document
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  //set expiry
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model("User", userSchema, "users");
