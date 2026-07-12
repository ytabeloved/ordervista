const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    getCommands,
    getCommandById
} = require("../controllers/commandController");

const router = express.Router();

router.get(
    "/",
    verifyToken,
    authorizeRoles(1, 2),
    getCommands
);

router.get(
    "/:id",
    verifyToken,
    authorizeRoles(1, 2),
    getCommandById
);

module.exports = router;