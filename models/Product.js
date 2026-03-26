const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    images: [String], // on peut stocker URLs
    units: { type: String }, // ex: "pièce", "kg", etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);