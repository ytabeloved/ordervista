const categoryModel = require("../models/categoryModel");

// Lista todas las categorías
async function getCategories(req, res) {
    try {
        const categories = await categoryModel.getAllCategories();

        res.json(categories);
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al obtener categorías"
        });
    }
}

// Obtiene una categoría por id
async function getCategoryById(req, res) {
    try {
        const category = await categoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        res.json(category);
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al obtener categoría"
        });
    }
}

// Crea una categoría
async function createCategory(req, res) {
    try {
        const { nombre, descripcion, activo } = req.body;

        if (!nombre) {
            return res.status(400).json({
                mensaje: "El nombre de la categoría es obligatorio"
            });
        }

        const categoryId = await categoryModel.createCategory({
            nombre,
            descripcion,
            activo
        });

        res.status(201).json({
            mensaje: "Categoría creada correctamente",
            id_categoria: categoryId
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al crear categoría"
        });
    }
}

// Actualiza una categoría
async function updateCategory(req, res) {
    try {
        const category = await categoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        await categoryModel.updateCategory(req.params.id, req.body);

        res.json({
            mensaje: "Categoría actualizada correctamente"
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al actualizar categoría"
        });
    }
}

// Elimina una categoría
async function deleteCategory(req, res) {
    try {
        const category = await categoryModel.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                mensaje: "Categoría no encontrada"
            });
        }

        await categoryModel.deleteCategory(req.params.id);

        res.json({
            mensaje: "Categoría eliminada correctamente"
        });
    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            mensaje: "Error al eliminar categoría"
        });
    }
}

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};