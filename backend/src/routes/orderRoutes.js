const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    createOrder
} = require("../controllers/orderController");

const router = express.Router();

router.post(
    "/",
    verifyToken,
    authorizeRoles(3),
    createOrder
);

module.exports = router;