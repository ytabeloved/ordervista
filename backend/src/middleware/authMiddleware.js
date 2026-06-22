const jwt = require("jsonwebtoken");

/*
    Valida que el usuario envíe un token válido.
*/
function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            mensaje: "Token no proporcionado"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        });
    }
}

module.exports = {
    verifyToken
};