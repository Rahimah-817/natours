const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requierd: [true, "Enter your name!"],
  },
  email: {
    type: String,
    requierd: [true, "Enter your email!"],
    uniqu: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "Please provide a password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    // Only work with SAVE
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
});

userSchema.pre("save", async function (next) {

  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

// Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete confirm password field
  this.confirmPassword = undefined;
  next()
});

const User = mongoose.model("user", userSchema);
module.exports = User;
