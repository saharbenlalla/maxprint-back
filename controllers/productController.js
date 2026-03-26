const Product = require("../models/Product");

// Create a product
exports.createProduct = async (req, res) => {
  try {

    // récupérer les images uploadées
    const images = req.files ? req.files.map(file => file.filename) : [];

    const product = await Product.create({
      ...req.body,
      images
    });

    res.status(201).json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get all products
exports.getProducts = async (req, res) => {
  try {

    const products = await Product.find().populate("category");

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Get single product
exports.getProductById = async (req, res) => {
  try {

    const product = await Product
      .findById(req.params.id)
      .populate("category");

    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Update product
exports.updateProduct = async (req, res) => {
  try {

    let updateData = { ...req.body };

    // si nouvelles images
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.filename);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Delete product
exports.deleteProduct = async (req, res) => {
  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });

    res.json({ message: "Produit supprimé" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
