const Project = require("../models/Project");

// CREATE
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getProjects = async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
};

// GET ONE
exports.getProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
};

// UPDATE
exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(project);
};

// DELETE
exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Projet supprimé" });
};