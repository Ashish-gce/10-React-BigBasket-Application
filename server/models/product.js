const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // we're not/never maintain any "id" b'z that's come automatically by the database.
  // Table structure
  name: {
    type: String,
    required: true,
    // if we want unique "name"
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  info: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
});

let Product = mongoose.model("Product", productSchema);
module.exports = Product;
