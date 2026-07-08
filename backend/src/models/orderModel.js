const db = require("../config/db");

async function createOrder(userId, order) {
    const connection = await db.getConnection();

    try {
        await connection.beginTransaction();

        const [pedidoResult] = await connection.query(
            `INSERT INTO PEDIDOS
            (id_usuario, id_tipo_pedido, id_direccion, id_estado, total, observacion)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userId,
                order.id_tipo_pedido,
                order.id_direccion || null,
                1,
                order.total,
                order.observacion || ""
            ]
        );

        const idPedido = pedidoResult.insertId;

        for (const item of order.items) {
            await connection.query(
                `INSERT INTO DETALLE_PEDIDO
                (id_pedido, id_producto, cantidad, precio_unitario, subtotal)
                VALUES (?, ?, ?, ?, ?)`,
                [
                    idPedido,
                    item.id_producto,
                    item.cantidad,
                    item.precio_unitario,
                    item.subtotal
                ]
            );
        }

        await connection.query(
            `INSERT INTO COMANDAS
            (id_pedido, observacion)
            VALUES (?, ?)`,
            [
                idPedido,
                order.observacion || ""
            ]
        );

        await connection.commit();

        return idPedido;

    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    createOrder
};