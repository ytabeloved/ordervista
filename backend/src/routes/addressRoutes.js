const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");

const {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
} = require("../controllers/addressController");

const router = express.Router();

// Todas las rutas requieren que el usuario esté autenticado
router.get("/", verifyToken, getAddresses);

router.post("/", verifyToken, createAddress);

router.put("/:id", verifyToken, updateAddress);

router.delete("/:id", verifyToken, deleteAddress);

module.exports = router;