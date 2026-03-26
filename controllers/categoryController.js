const Category = require("../models/Category");


// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {

    const { name, parent } = req.body;

    const category = new Category({
      name,
      parent: parent || null
    });

    await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {

    const categories = await Category.find()
      .populate("parent", "name");

    res.json(categories);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET CATEGORY BY ID
exports.getCategoryById = async (req, res) => {
  try {

    const category = await Category.findById(req.params.id)
      .populate("parent", "name");

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
  try {

    const { name, parent } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        parent: parent || null
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      message: "Category updated successfully",
      category
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  try {

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({
      message: "Category deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET PARENT CATEGORIES
exports.getParentCategories = async (req, res) => {
  try {

    const parents = await Category.find({ parent: null });

    res.json(parents);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SUB CATEGORIES
exports.getSubCategories = async (req, res) => {
  try {

    const subCategories = await Category.find({
      parent: req.params.parentId
    });

    res.json(subCategories);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};