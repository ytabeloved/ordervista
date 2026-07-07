const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

async function getMenu(req, res) {
    try {
        const categories = await categoryModel.getAllCategories();
        const products = await productModel.getAllProducts();

        const activeCategories = categories.filter(
            (category) => category.activo === true || category.activo === 1
        );

        const activeCategoryIds = activeCategories.map(
            (category) => category.id_categoria
        );

        const visibleProducts = products.filter((product) => {
            const productIsActive =
                product.activo === true || product.activo === 1;

            const categoryIsActive = activeCategoryIds.includes(
                product.id_categoria
            );

            return productIsActive && categoryIsActive;
        });

        res.json({
            categories: activeCategories,
            products: visibleProducts
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            mensaje: "Error al obtener el menú"
        });
    }
}

module.exports = {
    getMenu
};