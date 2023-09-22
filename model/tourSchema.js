const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: Number,
});
const Tour = mongoose.model('tour', tourSchema);
module.exports = Tour;
