const mongoose = require("mongoose");
const validator = require("validator");

// name email photo password confirmPassword

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
  },
});

const User = mongoose.model('user', userSchema)
module.exports = User