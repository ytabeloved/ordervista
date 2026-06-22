/*
    Verifica que el usuario tenga alguno de los roles permitidos.
*/
function authorizeRoles(...allowedRoles) {

    return (req, res, next) => {

        if (!req.user) {
            return res.status(401).json({
                mensaje: "Usuario no autenticado"
            });
        }

        if (!allowedRoles.includes(req.user.id_rol)) {
            return res.status(403).json({
                mensaje: "No tiene permisos para acceder a este recurso"
            });
        }

        next();
    };
}

module.exports = authorizeRoles;