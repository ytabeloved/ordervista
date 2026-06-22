const express = require("express");

const { verifyToken } = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get(
    "/admin",
    verifyToken,
    authorizeRoles(1),
    (req, res) => {
        res.json({
            mensaje: "Acceso administrador autorizado"
        });
    }
);

module.exports = router;