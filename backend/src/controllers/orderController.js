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

module.exports = {
    createOrder
};