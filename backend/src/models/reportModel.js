const db = require("../config/db");

function buildDateFilter(startDate, endDate) {
    const conditions = ["p.id_estado <> 5"];
    const params = [];

    if (startDate) {
        conditions.push("DATE(p.fecha_pedido) >= ?");
        params.push(startDate);
    }

    if (endDate) {
        conditions.push("DATE(p.fecha_pedido) <= ?");
        params.push(endDate);
    }

    return {
        where: conditions.join(" AND "),
        params
    };
}

async function getDashboardSummary(startDate, endDate) {
    const { where, params } = buildDateFilter(startDate, endDate);

    const [rows] = await db.query(
        `SELECT
            COUNT(DISTINCT p.id_pedido) AS total_pedidos,
            COALESCE(SUM(p.total), 0) AS ventas_estimadas,
            COALESCE(AVG(p.total), 0) AS ticket_promedio,
            COUNT(DISTINCT p.id_usuario) AS clientes_atendidos
         FROM PEDIDOS p
         WHERE ${where}`,
        params
    );

    return rows[0];
}

async function getAdminMetrics() {
    const [[ordersToday]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM PEDIDOS
         WHERE DATE(fecha_pedido) = CURDATE()
           AND id_estado <> 5`
    );

    const [[customers]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM USUARIOS
         WHERE id_rol = 3`
    );

    const [[activeProducts]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM PRODUCTOS
         WHERE activo = TRUE`
    );

    const [[pendingOrders]] = await db.query(
        `SELECT COUNT(*) AS total
         FROM PEDIDOS
         WHERE id_estado IN (1, 2, 3)`
    );

    return {
        orders_today: ordersToday.total,
        total_customers: customers.total,
        active_products: activeProducts.total,
        active_orders: pendingOrders.total
    };
}

async function getSalesByDay(startDate, endDate) {
    const { where, params } = buildDateFilter(startDate, endDate);

    const [rows] = await db.query(
        `SELECT
            DATE(p.fecha_pedido) AS fecha,
            COUNT(p.id_pedido) AS total_pedidos,
            COALESCE(SUM(p.total), 0) AS ventas
         FROM PEDIDOS p
         WHERE ${where}
         GROUP BY DATE(p.fecha_pedido)
         ORDER BY DATE(p.fecha_pedido) ASC`,
        params
    );

    return rows;
}

async function getTopProducts(startDate, endDate) {
    const { where, params } = buildDateFilter(startDate, endDate);

    const [rows] = await db.query(
        `SELECT
            pr.id_producto,
            pr.nombre,
            c.nombre AS categoria,
            SUM(dp.cantidad) AS cantidad_vendida,
            COALESCE(SUM(dp.subtotal), 0) AS total_vendido
         FROM DETALLE_PEDIDO dp
         INNER JOIN PEDIDOS p ON dp.id_pedido = p.id_pedido
         INNER JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         LEFT JOIN CATEGORIAS c ON pr.id_categoria = c.id_categoria
         WHERE ${where}
         GROUP BY pr.id_producto, pr.nombre, c.nombre
         ORDER BY cantidad_vendida DESC, total_vendido DESC
         LIMIT 8`,
        params
    );

    return rows;
}

async function getOrdersByStatus(startDate, endDate) {
    const { where, params } = buildDateFilter(startDate, endDate);

    const [rows] = await db.query(
        `SELECT
            ep.id_estado,
            ep.nombre AS estado,
            COUNT(p.id_pedido) AS total
         FROM PEDIDOS p
         INNER JOIN ESTADOS_PEDIDO ep ON p.id_estado = ep.id_estado
         WHERE ${where}
         GROUP BY ep.id_estado, ep.nombre
         ORDER BY ep.id_estado ASC`,
        params
    );

    return rows;
}

async function getSalesByCategory(startDate, endDate) {
    const { where, params } = buildDateFilter(startDate, endDate);

    const [rows] = await db.query(
        `SELECT
            c.id_categoria,
            c.nombre AS categoria,
            COALESCE(SUM(dp.subtotal), 0) AS total_vendido,
            COALESCE(SUM(dp.cantidad), 0) AS cantidad_vendida
         FROM DETALLE_PEDIDO dp
         INNER JOIN PEDIDOS p ON dp.id_pedido = p.id_pedido
         INNER JOIN PRODUCTOS pr ON dp.id_producto = pr.id_producto
         LEFT JOIN CATEGORIAS c ON pr.id_categoria = c.id_categoria
         WHERE ${where}
         GROUP BY c.id_categoria, c.nombre
         ORDER BY total_vendido DESC`,
        params
    );

    return rows;
}

async function getRecentOrders() {
    const [rows] = await db.query(
        `SELECT
            p.id_pedido,
            p.fecha_pedido,
            p.total,
            p.id_estado,
            p.id_tipo_pedido,
            u.nombre AS cliente_nombre,
            u.email AS cliente_email,
            ep.nombre AS estado,
            COUNT(dp.id_detalle) AS total_items
         FROM PEDIDOS p
         INNER JOIN USUARIOS u ON p.id_usuario = u.id_usuario
         INNER JOIN ESTADOS_PEDIDO ep ON p.id_estado = ep.id_estado
         LEFT JOIN DETALLE_PEDIDO dp ON p.id_pedido = dp.id_pedido
         GROUP BY
            p.id_pedido,
            p.fecha_pedido,
            p.total,
            p.id_estado,
            p.id_tipo_pedido,
            u.nombre,
            u.email,
            ep.nombre
         ORDER BY p.fecha_pedido DESC
         LIMIT 8`
    );

    return rows;
}

module.exports = {
    getDashboardSummary,
    getAdminMetrics,
    getSalesByDay,
    getTopProducts,
    getOrdersByStatus,
    getSalesByCategory,
    getRecentOrders
};