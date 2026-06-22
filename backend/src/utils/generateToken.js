const jwt = require("jsonwebtoken");

/*
    Genera un token JWT con los datos principales del usuario.
*/
function generateToken(user) {
    return jwt.sign(
        {
            id_usuario: user.id_usuario,
            email: user.email,
            id_rol: user.id_rol
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
}

module.exports = generateToken;