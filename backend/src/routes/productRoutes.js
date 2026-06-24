const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const router = express.Router();

// Lista productos
router.get("/", verifyToken, authorizeRoles(1), getProducts);

// Producto por id
router.get("/:id", verifyToken, authorizeRoles(1), getProductById);

// Crear producto
router.post("/", verifyToken, authorizeRoles(1), createProduct);

// Actualizar producto
router.put("/:id", verifyToken, authorizeRoles(1), updateProduct);

// Eliminar producto
router.delete("/:id", verifyToken, authorizeRoles(1), deleteProduct);

module.exports = router;