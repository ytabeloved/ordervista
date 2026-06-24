const pool = require("../config/db");

// Obtiene todos los productos registrados
async function getAllProducts() {

    const [rows] = await pool.query(`
        SELECT
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.precio,
            p.stock,
            p.imagen,
            p.activo,
            p.id_categoria,
            c.nombre AS categoria
        FROM PRODUCTOS p
        INNER JOIN CATEGORIAS c
            ON p.id_categoria = c.id_categoria
        ORDER BY p.id_producto DESC
    `);

    return rows;
}

// Busca un producto por id
async function findById(id) {

    const [rows] = await pool.query(
        `SELECT
            p.id_producto,
            p.nombre,
            p.descripcion,
            p.precio,
            p.stock,
            p.imagen,
            p.activo,
            p.id_categoria,
            c.nombre AS categoria
         FROM PRODUCTOS p
         INNER JOIN CATEGORIAS c
            ON p.id_categoria = c.id_categoria
         WHERE p.id_producto = ?`,
        [id]
    );

    return rows[0];
}

// Crea un nuevo producto
async function createProduct(product) {

    const [result] = await pool.query(
        `INSERT INTO PRODUCTOS
        (
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            id_categoria,
            activo
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            product.nombre,
            product.descripcion,
            product.precio,
            product.stock,
            product.imagen,
            product.id_categoria,
            product.activo ?? true
        ]
    );

    return result.insertId;
}

// Actualiza un producto existente
async function updateProduct(id, product) {

    const [result] = await pool.query(
        `UPDATE PRODUCTOS
         SET nombre = ?,
             descripcion = ?,
             precio = ?,
             stock = ?,
             imagen = ?,
             id_categoria = ?,
             activo = ?
         WHERE id_producto = ?`,
        [
            product.nombre,
            product.descripcion,
            product.precio,
            product.stock,
            product.imagen,
            product.id_categoria,
            product.activo,
            id
        ]
    );

    return result;
}

// Elimina un producto
async function deleteProduct(id) {

    const [result] = await pool.query(
        "DELETE FROM PRODUCTOS WHERE id_producto = ?",
        [id]
    );

    return result;
}

module.exports = {
    getAllProducts,
    findById,
    createProduct,
    updateProduct,
    deleteProduct
};