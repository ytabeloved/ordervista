const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getDashboardReport
} = require("../controllers/reportController");

const router = express.Router();

router.get(
    "/dashboard",
    verifyToken,
    authorizeRoles(1),
    getDashboardReport
);

module.exports = router;