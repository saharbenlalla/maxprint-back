const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");
const upload = require("../middlewares/upload");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

router.post("/",protect, admin, upload.array("images"), serviceController.createService);
router.get("/", serviceController.getServices);
router.get("/:id", serviceController.getServiceById);
router.put("/:id", protect, admin,upload.array("images"), serviceController.updateService);
router.delete("/:id",protect, admin, serviceController.deleteService);

module.exports = router;
