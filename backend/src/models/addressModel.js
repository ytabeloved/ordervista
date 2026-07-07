const db = require("../config/db");

async function getAddressesByUser(userId) {
    const [rows] = await db.query(
        `SELECT *
         FROM DIRECCIONES
         WHERE id_usuario = ?
           AND activo = TRUE
         ORDER BY principal DESC, id_direccion DESC`,
        [userId]
    );

    return rows;
}

async function createAddress(userId, address) {
    const [result] = await db.query(
        `INSERT INTO DIRECCIONES
        (id_usuario, direccion, comuna, ciudad, referencia, principal, activo)
        VALUES (?, ?, ?, ?, ?, ?, TRUE)`,
        [
            userId,
            address.direccion,
            address.comuna,
            address.ciudad,
            address.referencia || "",
            address.principal || false
        ]
    );

    return result.insertId;
}

async function updateAddress(userId, id, address) {
    const [result] = await db.query(
        `UPDATE DIRECCIONES
         SET direccion = ?,
             comuna = ?,
             ciudad = ?,
             referencia = ?,
             principal = ?
         WHERE id_direccion = ?
           AND id_usuario = ?`,
        [
            address.direccion,
            address.comuna,
            address.ciudad,
            address.referencia || "",
            address.principal || false,
            id,
            userId
        ]
    );

    return result;
}

async function deactivateAddress(userId, id) {
    const [result] = await db.query(
        `UPDATE DIRECCIONES
         SET activo = FALSE
         WHERE id_direccion = ?
           AND id_usuario = ?`,
        [id, userId]
    );

    return result;
}

module.exports = {
    getAddressesByUser,
    createAddress,
    updateAddress,
    deactivateAddress
};