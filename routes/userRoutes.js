// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { getUsers, updateUserRole } = require("../controllers/userController");

router.get("/", getUsers); // récupérer tous les utilisateurs
router.put("/:id/role", updateUserRole); // modifier le rôle d'un utilisateur

module.exports = router;
