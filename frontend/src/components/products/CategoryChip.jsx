// Etiqueta visual para mostrar la categoría del producto
function CategoryChip({ name }) {
    return (
        <span className="category-chip">
            {name || "Sin categoría"}
        </span>
    );
}

export default CategoryChip;