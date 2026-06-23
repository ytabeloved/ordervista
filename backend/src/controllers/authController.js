const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");

// Registra un nuevo usuario como cliente
async function register(req, res) {
    try {
        const { nombre, apellido, email, password, telefono } = req.body;

        if (!nombre || !apellido || !email || !password) {
            return res.status(400).json({
                mensaje: "Debe completar los datos obligatorios"
            });
        }

        const existingUser = await userModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                mensaje: "El correo ya se encuentra registrado"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await userModel.createUser({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            telefono,
            id_rol: 3
        });

        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            id_usuario: userId
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al registrar usuario"
        });
    }
}

module.exports = {
    register
};