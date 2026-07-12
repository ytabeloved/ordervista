const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getOrderTypes,
    getOrderTypeById,
    createOrderType,
    updateOrderType,
    deleteOrderType
} = require("../controllers/orderTypeController");

const router = express.Router();

// Lista tipos de pedido
router.get("/", verifyToken, authorizeRoles(1,2,3), getOrderTypes);

// Tipo de pedido por id
router.get("/:id", verifyToken, authorizeRoles(1), getOrderTypeById);

// Crear tipo de pedido
router.post("/", verifyToken, authorizeRoles(1), createOrderType);

// Actualizar tipo de pedido
router.put("/:id", verifyToken, authorizeRoles(1), updateOrderType);

// Eliminar tipo de pedido
router.delete("/:id", verifyToken, authorizeRoles(1), deleteOrderType);

module.exports = router;