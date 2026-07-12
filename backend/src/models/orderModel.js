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

async function getOrdersByUser(userId) {
    const [rows] = await db.query(
        `SELECT
            p.id_pedido,
            p.id_tipo_pedido,
            p.id_direccion,
            p.id_estado,
            p.fecha_pedido,
            p.total,
            p.observacion,
            d.direccion,
            d.comuna,
            d.ciudad,
            COUNT(dp.id_detalle) AS total_items
         FROM PEDIDOS p
         LEFT JOIN DIRECCIONES d ON p.id_direccion = d.id_direccion
         LEFT JOIN DETALLE_PEDIDO dp ON p.id_pedido = dp.id_pedido
         WHERE p.id_usuario = ?
         GROUP BY
            p.id_pedido,
            p.id_tipo_pedido,
            p.id_direccion,
            p.id_estado,
            p.fecha_pedido,
            p.total,
            p.observacion,
            d.direccion,
            d.comuna,
            d.ciudad
         ORDER BY p.fecha_pedido DESC`,
        [userId]
    );

    return rows;
}

async function getOrderDetailByUser(userId, orderId) {
    const [orders] = await db.query(
        `SELECT
            p.id_pedido,
            p.id_tipo_pedido,
            p.id_direccion,
            p.id_estado,
            p.fecha_pedido,
            p.total,
            p.observacion,
            d.direccion,
            d.comuna,
            d.ciudad
         FROM PEDIDOS p
         LEFT JOIN DIRECCIONES d ON p.id_direccion = d.id_direccion
         WHERE p.id_pedido = ?
           AND p.id_usuario = ?`,
        [orderId, userId]
    );

    if (orders.length === 0) {
        return null;
    }

    const [items] = await db.query(
        `SELECT
            dp.id_detalle,
            dp.id_producto,
            pr.nombre,
            pr.descripcion,
            pr.imagen,
            dp.cantidad,
            dp.precio_unitario,
            dp.subtotal
         FROM DETALLE_PEDIDO dp
         INNER JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         WHERE dp.id_pedido = ?
         ORDER BY dp.id_detalle ASC`,
        [orderId]
    );

    return {
        ...orders[0],
        items
    };
}

async function getAllOrders() {
    const [rows] = await db.query(
        `SELECT
            p.id_pedido,
            p.id_usuario,
            u.nombre AS cliente_nombre,
            u.email AS cliente_email,
            p.id_tipo_pedido,
            p.id_direccion,
            p.id_estado,
            p.fecha_pedido,
            p.total,
            p.observacion,
            d.direccion,
            d.comuna,
            d.ciudad,
            COUNT(dp.id_detalle) AS total_items,
            GROUP_CONCAT(
                CONCAT(dp.cantidad, 'x ', pr.nombre)
                ORDER BY dp.id_detalle
                SEPARATOR '||'
            ) AS items_text
         FROM PEDIDOS p
         INNER JOIN USUARIOS u ON p.id_usuario = u.id_usuario
         LEFT JOIN DIRECCIONES d ON p.id_direccion = d.id_direccion
         LEFT JOIN DETALLE_PEDIDO dp ON p.id_pedido = dp.id_pedido
         LEFT JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         GROUP BY
            p.id_pedido,
            p.id_usuario,
            u.nombre,
            u.email,
            p.id_tipo_pedido,
            p.id_direccion,
            p.id_estado,
            p.fecha_pedido,
            p.total,
            p.observacion,
            d.direccion,
            d.comuna,
            d.ciudad
         ORDER BY p.fecha_pedido DESC`
    );

    return rows;
}

async function getOrderDetailById(orderId) {
    const [orders] = await db.query(
        `SELECT
            p.id_pedido,
            p.id_usuario,
            u.nombre AS cliente_nombre,
            u.email AS cliente_email,
            p.id_tipo_pedido,
            p.id_direccion,
            p.id_estado,
            p.fecha_pedido,
            p.total,
            p.observacion,
            d.direccion,
            d.comuna,
            d.ciudad
         FROM PEDIDOS p
         INNER JOIN USUARIOS u ON p.id_usuario = u.id_usuario
         LEFT JOIN DIRECCIONES d ON p.id_direccion = d.id_direccion
         WHERE p.id_pedido = ?`,
        [orderId]
    );

    if (orders.length === 0) {
        return null;
    }

    const [items] = await db.query(
        `SELECT
            dp.id_detalle,
            dp.id_producto,
            pr.nombre,
            pr.descripcion,
            pr.imagen,
            dp.cantidad,
            dp.precio_unitario,
            dp.subtotal
         FROM DETALLE_PEDIDO dp
         INNER JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         WHERE dp.id_pedido = ?
         ORDER BY dp.id_detalle ASC`,
        [orderId]
    );

    return {
        ...orders[0],
        items
    };
}

module.exports = {
    createOrder,
    getOrdersByUser,
    getOrderDetailByUser,
    getAllOrders,
    getOrderDetailById
};