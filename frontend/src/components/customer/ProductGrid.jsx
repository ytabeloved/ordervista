import ProductCard from "./ProductCard";

function ProductGrid({
    products = [],
    selectedCategory,
    search,
    onView,
    onAddToCart
}) {
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "all" ||
            product.id_categoria === selectedCategory;

        const matchesSearch =
            product.nombre.toLowerCase().includes(search.toLowerCase()) ||
            (product.descripcion || "")
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchesCategory && matchesSearch;
    });

    if (filteredProducts.length === 0) {
        return (
            <div className="customer-empty-state">
                <h3>No se encontraron productos</h3>
                <p>Intenta con otra categoría o término de búsqueda.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {filteredProducts.map((product) => (
                <ProductCard
                    key={product.id_producto}
                    product={product}
                    onView={onView}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}

export default ProductGrid;