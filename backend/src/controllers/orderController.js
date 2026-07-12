const orderModel = require("../models/orderModel");

async function createOrder(req, res) {
    try {
        const idPedido = await orderModel.createOrder(
            req.user.id_usuario,
            req.body
        );

        return res.status(201).json({
            mensaje: "Pedido creado correctamente",
            id_pedido: idPedido
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear el pedido"
        });
    }
}

async function createInPersonOrder(req, res) {
    try {
        const orderData = {
            id_tipo_pedido: 3,
            id_direccion: null,
            total: req.body.total,
            observacion: req.body.observacion || "Pedido presencial",
            items: req.body.items
        };

        const idPedido = await orderModel.createOrder(
            req.user.id_usuario,
            orderData
        );

        return res.status(201).json({
            mensaje: "Pedido presencial creado correctamente",
            id_pedido: idPedido
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al crear el pedido presencial"
        });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await orderModel.getOrdersByUser(req.user.id_usuario);

        return res.json(orders);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener el historial de pedidos"
        });
    }
}

async function getOrderDetail(req, res) {
    try {
        const order = await orderModel.getOrderDetailByUser(
            req.user.id_usuario,
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });
        }

        return res.json(order);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener el detalle del pedido"
        });
    }
}

module.exports = {
    createOrder,
    createInPersonOrder,
    getOrders,
    getOrderDetail
};