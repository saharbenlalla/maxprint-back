const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const protect = require("../middlewares/authMiddleware");
const admin = require("../middlewares/adminMiddleware");

// GET ALL
router.get("/", offerController.getOffers);

// GET ONE
router.get("/:id", offerController.getOfferById);

// ADD avec upload
router.post(
  "/",
  protect,
  admin,
  offerController.upload,
  offerController.createOffer
);

// UPDATE avec upload
router.put(
  "/:id",
  protect,
  admin,
  offerController.upload,
  offerController.updateOffer
);

// DELETE
router.delete("/:id", protect, admin, offerController.deleteOffer);

module.exports = router;