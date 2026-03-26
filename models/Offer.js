// Exemple Mongoose
const mongoose = require("mongoose");


const OfferSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, 
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Offer', OfferSchema);