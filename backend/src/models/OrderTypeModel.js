const pool = require("../config/db");

// Obtiene todos los tipos de pedido
async function getAllOrderTypes() {
    const [rows] = await pool.query(
        "SELECT * FROM TIPOS_PEDIDO ORDER BY id_tipo_pedido ASC"
    );

    return rows;
}

// Busca un tipo de pedido por id
async function findById(id) {
    const [rows] = await pool.query(
        "SELECT * FROM TIPOS_PEDIDO WHERE id_tipo_pedido = ?",
        [id]
    );

    return rows[0];
}

// Crea un nuevo tipo de pedido
async function createOrderType(orderType) {
    const [result] = await pool.query(
        `INSERT INTO TIPOS_PEDIDO
        (
            nombre,
            descripcion
        )
        VALUES (?, ?)`,
        [
            orderType.nombre,
            orderType.descripcion
        ]
    );

    return result.insertId;
}

// Actualiza un tipo de pedido
async function updateOrderType(id, orderType) {
    const [result] = await pool.query(
        `UPDATE TIPOS_PEDIDO
         SET nombre = ?,
             descripcion = ?
         WHERE id_tipo_pedido = ?`,
        [
            orderType.nombre,
            orderType.descripcion,
            id
        ]
    );

    return result;
}

// Elimina un tipo de pedido
async function deleteOrderType(id) {
    const [result] = await pool.query(
        "DELETE FROM TIPOS_PEDIDO WHERE id_tipo_pedido = ?",
        [id]
    );

    return result;
}

module.exports = {
    getAllOrderTypes,
    findById,
    createOrderType,
    updateOrderType,
    deleteOrderType
};