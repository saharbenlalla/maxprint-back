const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getParentCategories,
  getSubCategories
} = require("../controllers/categoryController");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.post("/", protect, admin, createCategory);

router.get("/", getCategories);

router.get("/parents", getParentCategories);

router.get("/:id", getCategoryById);

router.put("/:id", protect, admin, updateCategory);

router.delete("/:id",protect, admin,  deleteCategory);

router.get("/sub/:parentId", getSubCategories);


module.exports = router;