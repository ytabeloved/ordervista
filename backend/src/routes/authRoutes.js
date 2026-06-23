const express = require("express");
const { register } = require("../controllers/authController");

const router = express.Router();

// Ruta para registrar clientes
router.post("/register", register);

module.exports = router;