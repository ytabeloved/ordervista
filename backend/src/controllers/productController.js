const productModel = require("../models/productModel");

// Lista todos los productos
async function getProducts(req, res) {
    try {
        const products = await productModel.getAllProducts();
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al obtener productos" });
    }
}

// Obtiene un producto por id
async function getProductById(req, res) {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al obtener producto" });
    }
}

// Crea un producto
async function createProduct(req, res) {
    try {
        const { nombre, descripcion, precio, stock, imagen, id_categoria, activo } = req.body;

        if (!nombre || !precio || !id_categoria) {
            return res.status(400).json({
                mensaje: "Nombre, precio y categoría son obligatorios"
            });
        }

        const productId = await productModel.createProduct({
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            id_categoria,
            activo
        });

        res.status(201).json({
            mensaje: "Producto creado correctamente",
            id_producto: productId
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al crear producto" });
    }
}

// Actualiza un producto
async function updateProduct(req, res) {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await productModel.updateProduct(req.params.id, req.body);

        res.json({ mensaje: "Producto actualizado correctamente" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al actualizar producto" });
    }
}

// Elimina un producto
async function deleteProduct(req, res) {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await productModel.deleteProduct(req.params.id);

        res.json({ mensaje: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};