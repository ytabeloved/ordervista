const db = require("../config/db");

async function getCommands() {
    const [rows] = await db.query(
        `SELECT
            c.id_comanda,
            c.id_pedido,
            c.fecha_generacion,
            c.observacion,
            p.id_estado,
            p.id_tipo_pedido,
            p.total,
            p.fecha_pedido,
            u.nombre AS cliente_nombre,
            u.email AS cliente_email,
            COUNT(dp.id_detalle) AS total_items,
            GROUP_CONCAT(
                CONCAT(dp.cantidad, 'x ', pr.nombre)
                ORDER BY dp.id_detalle
                SEPARATOR '||'
            ) AS items_text
         FROM COMANDAS c
         INNER JOIN PEDIDOS p ON c.id_pedido = p.id_pedido
         INNER JOIN USUARIOS u ON p.id_usuario = u.id_usuario
         LEFT JOIN DETALLE_PEDIDO dp ON p.id_pedido = dp.id_pedido
         LEFT JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         GROUP BY
            c.id_comanda,
            c.id_pedido,
            c.fecha_generacion,
            c.observacion,
            p.id_estado,
            p.id_tipo_pedido,
            p.total,
            p.fecha_pedido,
            u.nombre,
            u.email
         ORDER BY c.fecha_generacion DESC`
    );

    return rows;
}

async function getCommandById(idComanda) {
    const [commands] = await db.query(
        `SELECT
            c.id_comanda,
            c.id_pedido,
            c.fecha_generacion,
            c.observacion,
            p.id_estado,
            p.id_tipo_pedido,
            p.total,
            p.fecha_pedido,
            u.nombre AS cliente_nombre,
            u.email AS cliente_email
         FROM COMANDAS c
         INNER JOIN PEDIDOS p ON c.id_pedido = p.id_pedido
         INNER JOIN USUARIOS u ON p.id_usuario = u.id_usuario
         WHERE c.id_comanda = ?`,
        [idComanda]
    );

    if (commands.length === 0) {
        return null;
    }

    const [items] = await db.query(
        `SELECT
            dp.id_detalle,
            dp.id_producto,
            pr.nombre,
            pr.descripcion,
            dp.cantidad,
            dp.precio_unitario,
            dp.subtotal
         FROM DETALLE_PEDIDO dp
         INNER JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         WHERE dp.id_pedido = ?
         ORDER BY dp.id_detalle ASC`,
        [commands[0].id_pedido]
    );

    return {
        ...commands[0],
        items
    };
}

module.exports = {
    getCommands,
    getCommandById
};