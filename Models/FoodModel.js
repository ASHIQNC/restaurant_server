const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const foods = new mongoose.model("foods", foodSchema);
module.exports = foods;
