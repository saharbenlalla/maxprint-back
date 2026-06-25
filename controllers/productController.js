const Product = require("../models/Product");

// ================= CREATE PRODUCT =================
exports.createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const images = req.files
      ? req.files.map(file => file.filename)
      : [];

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      images
    });

    res.status(201).json(product);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
      stack: err.stack
    });
  }
};

// ================= GET ALL PRODUCTS =================
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= GET PRODUCT BY ID =================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= UPDATE PRODUCT =================
exports.updateProduct = async (req, res) => {
  try {
    let updateData = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price)
    };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map(file => file.filename);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= DELETE PRODUCT =================
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json({ message: "Produit supprimé" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};