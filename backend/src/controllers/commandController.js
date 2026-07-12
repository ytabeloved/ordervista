const commandModel = require("../models/commandModel");

async function getCommands(req, res) {
    try {
        const commands = await commandModel.getCommands();
        res.json(commands);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener las comandas"
        });
    }
}

async function getCommandById(req, res) {
    try {
        const command = await commandModel.getCommandById(req.params.id);

        if (!command) {
            return res.status(404).json({
                mensaje: "Comanda no encontrada"
            });
        }

        res.json(command);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener el detalle de la comanda"
        });
    }
}

module.exports = {
    getCommands,
    getCommandById
};