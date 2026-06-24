const pool = require("../config/db");

// Obtiene todas las categorías
async function getAllCategories() {
    const [rows] = await pool.query(
        "SELECT * FROM CATEGORIAS ORDER BY id_categoria DESC"
    );

    return rows;
}

// Busca una categoría por id
async function findById(id) {
    const [rows] = await pool.query(
        "SELECT * FROM CATEGORIAS WHERE id_categoria = ?",
        [id]
    );

    return rows[0];
}

// Crea una nueva categoría
async function createCategory(category) {
    const [result] = await pool.query(
        `INSERT INTO CATEGORIAS
        (
            nombre,
            descripcion,
            activo
        )
        VALUES (?, ?, ?)`,
        [
            category.nombre,
            category.descripcion,
            category.activo ?? true
        ]
    );

    return result.insertId;
}

// Actualiza una categoría
async function updateCategory(id, category) {
    const [result] = await pool.query(
        `UPDATE CATEGORIAS
         SET nombre = ?,
             descripcion = ?,
             activo = ?
         WHERE id_categoria = ?`,
        [
            category.nombre,
            category.descripcion,
            category.activo,
            id
        ]
    );

    return result;
}

// Elimina una categoría
async function deleteCategory(id) {
    const [result] = await pool.query(
        "DELETE FROM CATEGORIAS WHERE id_categoria = ?",
        [id]
    );

    return result;
}

module.exports = {
    getAllCategories,
    findById,
    createCategory,
    updateCategory,
    deleteCategory
};