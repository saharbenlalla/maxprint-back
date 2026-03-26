// controllers/userController.js
const User = require("../models/User");

// Modifier le rôle d'un utilisateur
exports.updateUserRole = async (req, res) => {
  const { role } = req.body; // rôle à modifier

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });

    user.role = role; // Met à jour le rôle
    await user.save();

    res.json({ message: "Rôle mis à jour", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Lister tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // On ne renvoie pas le mot de passe
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
