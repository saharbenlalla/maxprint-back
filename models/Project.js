const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    image: { type: String },
    client: { type: String },
    location: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);