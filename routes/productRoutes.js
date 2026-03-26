const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const upload = require("../middlewares/upload");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

// CRUD routes
router.post("/", protect, admin, upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protect, admin, upload.array("images", 5), updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;