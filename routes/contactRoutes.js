const express = require("express");
const router = express.Router();
const { createContact, getContacts } = require("../controllers/contactController");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.post("/", createContact);
router.get("/", protect, admin, getContacts);

module.exports = router;