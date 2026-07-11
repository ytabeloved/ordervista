const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createOrder,
    getOrders,
    getOrderDetail
} = require("../controllers/orderController");

const router = express.Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles(3),
    getOrders
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles(3),
    getOrderDetail
);

router.post(
    "/",
    verifyToken,
    authorizeRoles(3),
    createOrder
);

module.exports = router;