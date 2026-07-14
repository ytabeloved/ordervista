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

        return res.status(error.statusCode || 500).json({
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

        return res.status(error.statusCode || 500).json({
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

async function getManagedOrders(req, res) {
    try {
        const orders = await orderModel.getAllOrders();

        return res.json(orders);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al obtener la gestión de pedidos"
        });
    }
}

async function getManagedOrderDetail(req, res) {
    try {
        const order = await orderModel.getOrderDetailById(req.params.id);

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

async function updateOrderStatus(req, res) {
    try {
        const { id_estado } = req.body;

        if (!id_estado || ![1, 2, 3, 4, 5].includes(Number(id_estado))) {
            return res.status(400).json({
                mensaje: "Estado de pedido inválido"
            });
        }

        const result = await orderModel.updateOrderStatus(
            req.params.id,
            Number(id_estado)
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "Pedido no encontrado"
            });
        }

        return res.json({
            mensaje: "Estado del pedido actualizado correctamente"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensaje: "Error al actualizar el estado del pedido"
        });
    }
}

module.exports = {
    createOrder,
    createInPersonOrder,
    getOrders,
    getOrderDetail,
    getManagedOrders,
    getManagedOrderDetail,
    updateOrderStatus
};