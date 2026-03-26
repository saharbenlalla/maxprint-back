const express = require("express");
const router = express.Router();
const {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.get("/", getProjects);
router.get("/:id", getProject);

router.post("/", protect, admin, createProject);
router.put("/:id", protect, admin, updateProject);
router.delete("/:id", protect, admin, deleteProject);

module.exports = router;