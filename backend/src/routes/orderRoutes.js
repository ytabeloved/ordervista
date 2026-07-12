const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createOrder,
    createInPersonOrder,
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

router.post(
    "/in-person",
    verifyToken,
    authorizeRoles(1, 2),
    createInPersonOrder
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