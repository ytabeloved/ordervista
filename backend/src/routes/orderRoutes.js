const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createOrder,
    createInPersonOrder,
    getOrders,
    getOrderDetail,
    getManagedOrders,
    getManagedOrderDetail
} = require("../controllers/orderController");

const router = express.Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles(3),
    getOrders
);

router.get(
    "/manage",
    verifyToken,
    authorizeRoles(1, 2),
    getManagedOrders
);

router.get(
    "/manage/:id",
    verifyToken,
    authorizeRoles(1, 2),
    getManagedOrderDetail
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