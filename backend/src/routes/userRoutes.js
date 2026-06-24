const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

// Lista usuarios
router.get(
    "/",
    verifyToken,
    authorizeRoles(1),
    getUsers
);

// Usuario por id
router.get(
    "/:id",
    verifyToken,
    authorizeRoles(1),
    getUserById
);

// Crear usuario
router.post(
    "/",
    verifyToken,
    authorizeRoles(1),
    createUser
);

// Actualizar usuario
router.put(
    "/:id",
    verifyToken,
    authorizeRoles(1),
    updateUser
);

// Eliminar usuario
router.delete(
    "/:id",
    verifyToken,
    authorizeRoles(1),
    deleteUser
);

module.exports = router;