const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");

const { getMenu } = require("../controllers/menuController");

const router = express.Router();

router.get("/", verifyToken, getMenu);

module.exports = router;