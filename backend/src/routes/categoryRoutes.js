const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Lista categorías
router.get("/", verifyToken, authorizeRoles(1), getCategories);

// Categoría por id
router.get("/:id", verifyToken, authorizeRoles(1), getCategoryById);

// Crear categoría
router.post("/", verifyToken, authorizeRoles(1), createCategory);

// Actualizar categoría
router.put("/:id", verifyToken, authorizeRoles(1), updateCategory);

// Eliminar categoría
router.delete("/:id", verifyToken, authorizeRoles(1), deleteCategory);

module.exports = router;