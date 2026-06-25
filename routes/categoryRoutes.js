const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.post("/", protect, admin, createCategory);

router.get("/", getCategories);


router.get("/:id", getCategoryById);

router.put("/:id", protect, admin, updateCategory);

router.delete("/:id",protect, admin,  deleteCategory);




module.exports = router;