const Service = require("../models/Service");

// Créer un service
exports.createService = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.filename) : [];
    const service = await Service.create({ ...req.body, images });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer tous les services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupérer un service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service non trouvé" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Modifier un service
exports.updateService = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => file.filename) : undefined;
    const updateData = { ...req.body };
    if (images) updateData.images = images;

    const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!service) return res.status(404).json({ message: "Service non trouvé" });
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Supprimer un service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service non trouvé" });
    res.json({ message: "Service supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
