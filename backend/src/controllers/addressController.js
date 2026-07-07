const addressModel = require("../models/addressModel");

// Obtiene las direcciones del usuario autenticado
async function getAddresses(req, res) {
    try {
        const addresses = await addressModel.getAddressesByUser(
            req.user.id_usuario
        );

        res.json(addresses);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener las direcciones."
        });
    }
}

// Crea una nueva dirección
async function createAddress(req, res) {
    try {

        const id = await addressModel.createAddress(
            req.user.id_usuario,
            req.body
        );

        res.status(201).json({
            mensaje: "Dirección creada correctamente.",
            id_direccion: id
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al crear la dirección."
        });

    }
}

// Actualiza una dirección del usuario
async function updateAddress(req, res) {
    try {

        await addressModel.updateAddress(
            req.user.id_usuario,
            req.params.id,
            req.body
        );

        res.json({
            mensaje: "Dirección actualizada correctamente."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al actualizar la dirección."
        });

    }
}

// Desactiva una dirección
async function deleteAddress(req, res) {
    try {

        await addressModel.deactivateAddress(
            req.user.id_usuario,
            req.params.id
        );

        res.json({
            mensaje: "Dirección eliminada correctamente."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            mensaje: "Error al eliminar la dirección."
        });

    }
}

module.exports = {
    getAddresses,
    createAddress,
    updateAddress,
    deleteAddress
};