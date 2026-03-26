const Offer = require("../models/Offer");
const path = require("path");
const multer = require("multer");

// -------------------- MULTER CONFIG --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Crée le dossier "uploads" si nécessaire
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images sont autorisées"), false);
  }
};

const upload = multer({ storage, fileFilter });

// -------------------- CONTROLLERS --------------------

// GET ALL
exports.getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ONE
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    res.json(offer);
  } catch (err) {
    res.status(404).json({ message: "Offre non trouvée" });
  }
};

// ADD
exports.createOffer = async (req, res) => {
  try {
    const newOffer = new Offer({
      ...req.body,
      image: req.file ? `/uploads/${req.file.filename}` : null,
    });
    await newOffer.save();
    res.json({ message: "Offre ajoutée", data: newOffer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
exports.updateOffer = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({ message: "Offre modifiée", data: updatedOffer });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.json({ message: "Offre supprimée" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// EXPORT MULTER
exports.upload = upload.single("image");