const orderTypeModel = require("../models/orderTypeModel");

// Lista todos los tipos de pedido
async function getOrderTypes(req, res) {
    try {
        const orderTypes = await orderTypeModel.getAllOrderTypes();
        res.json(orderTypes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al obtener tipos de pedido" });
    }
}

// Obtiene un tipo de pedido por id
async function getOrderTypeById(req, res) {
    try {
        const orderType = await orderTypeModel.findById(req.params.id);

        if (!orderType) {
            return res.status(404).json({
                mensaje: "Tipo de pedido no encontrado"
            });
        }

        res.json(orderType);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al obtener tipo de pedido" });
    }
}

// Crea un tipo de pedido
async function createOrderType(req, res) {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "El nombre del tipo de pedido es obligatorio"
            });
        }

        const orderTypeId = await orderTypeModel.createOrderType({
            nombre,
            descripcion
        });

        res.status(201).json({
            mensaje: "Tipo de pedido creado correctamente",
            id_tipo_pedido: orderTypeId
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al crear tipo de pedido" });
    }
}

// Actualiza un tipo de pedido
async function updateOrderType(req, res) {
    try {
        const orderType = await orderTypeModel.findById(req.params.id);

        if (!orderType) {
            return res.status(404).json({
                mensaje: "Tipo de pedido no encontrado"
            });
        }

        await orderTypeModel.updateOrderType(req.params.id, req.body);

        res.json({
            mensaje: "Tipo de pedido actualizado correctamente"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al actualizar tipo de pedido" });
    }
}

// Elimina un tipo de pedido
async function deleteOrderType(req, res) {
    try {
        const orderType = await orderTypeModel.findById(req.params.id);

        if (!orderType) {
            return res.status(404).json({
                mensaje: "Tipo de pedido no encontrado"
            });
        }

        await orderTypeModel.deleteOrderType(req.params.id);

        res.json({
            mensaje: "Tipo de pedido eliminado correctamente"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al eliminar tipo de pedido" });
    }
}

module.exports = {
    getOrderTypes,
    getOrderTypeById,
    createOrderType,
    updateOrderType,
    deleteOrderType
};