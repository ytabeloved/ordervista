const pool = require("../config/db");

/*
    Obtiene todos los usuarios registrados.
*/
async function getAllUsers() {
    const [rows] = await pool.query(`
        SELECT
            u.id_usuario,
            u.nombre,
            u.apellido,
            u.email,
            u.telefono,
            u.activo,
            r.nombre AS rol
        FROM USUARIOS u
        INNER JOIN ROLES r
            ON u.id_rol = r.id_rol
    `);

    return rows;
}

/*
    Busca un usuario por correo electrónico.
*/
async function findByEmail(email) {
    const [rows] = await pool.query(
        "SELECT * FROM USUARIOS WHERE email = ?",
        [email]
    );

    return rows[0];
}

/*
    Busca un usuario por su identificador.
*/
async function findById(id) {
    const [rows] = await pool.query(
        "SELECT * FROM USUARIOS WHERE id_usuario = ?",
        [id]
    );

    return rows[0];
}

/*
    Registra un nuevo usuario.
*/
async function createUser(user) {
    const [result] = await pool.query(
        `INSERT INTO USUARIOS
        (
            nombre,
            apellido,
            email,
            password,
            telefono,
            id_rol
        )
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
            user.nombre,
            user.apellido,
            user.email,
            user.password,
            user.telefono,
            user.id_rol
        ]
    );

    return result.insertId;
}

module.exports = {
    getAllUsers,
    findByEmail,
    findById,
    createUser
};