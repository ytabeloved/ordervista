const userModel = require("../models/userModel");

// Lista todos los usuarios
async function getUsers(req, res) {

    try {

        const users = await userModel.getAllUsers();

        res.json(users);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al obtener usuarios"
        });
    }
}

// Obtiene un usuario por id
async function getUserById(req, res) {

    try {

        const user = await userModel.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            });
        }

        res.json(user);

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al obtener usuario"
        });
    }
}

const bcrypt = require("bcryptjs");

// Crea un usuario
async function createUser(req, res) {

    try {

        const {
            nombre,
            apellido,
            email,
            password,
            telefono,
            id_rol
        } = req.body;

        const existingUser = await userModel.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                mensaje: "El correo ya existe"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await userModel.createUser({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            telefono,
            id_rol
        });

        res.status(201).json({
            mensaje: "Usuario creado correctamente",
            id_usuario: userId
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al crear usuario"
        });
    }
}

// Actualiza un usuario
async function updateUser(req, res) {

    try {

        await userModel.updateUser(
            req.params.id,
            req.body
        );

        res.json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al actualizar usuario"
        });
    }
}

// Elimina un usuario
async function deleteUser(req, res) {

    try {

        await userModel.deleteUser(req.params.id);

        res.json({
            mensaje: "Usuario eliminado correctamente"
        });

    } catch (error) {

        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al eliminar usuario"
        });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};