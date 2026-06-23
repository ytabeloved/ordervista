const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");

// Ruta para registrar clientes
router.post("/register", register);

// Ruta para cerrar sesión
router.post("/logout", logout);

// Ruta para iniciar sesión
router.post("/login", login);



module.exports = router;