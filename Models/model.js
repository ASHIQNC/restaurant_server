const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 20,
  },
  isAdmin: {
    type: Boolean,
    default: true,
  },
});

const admins = new mongoose.model("admins", adminSchema);
module.exports = admins;
