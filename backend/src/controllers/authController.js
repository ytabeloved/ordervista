const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const generateToken = require("../utils/generateToken");

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

// Inicia sesión y devuelve un token JWT
async function login(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debe ingresar correo y contraseña"
            });
        }

        const user = await userModel.findByEmail(email);

        if (!user) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({
                mensaje: "Credenciales inválidas"
            });
        }

        const token = generateToken(user);

        res.json({
            mensaje: "Inicio de sesión correcto",
            token,
            usuario: {
                id_usuario: user.id_usuario,
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                id_rol: user.id_rol
            }
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al iniciar sesión"
        });
    }
}

// Cierre de sesión
function logout(req, res) {

    res.status(200).json({
        mensaje: "Sesión cerrada correctamente"
    });

}

module.exports = {
    register,
    login,
    logout
};