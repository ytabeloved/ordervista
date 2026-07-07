function CategoryTabs({ categories = [], selected, onChange }) {
    return (
        <div className="category-tabs">
            <button
                className={selected === "all" ? "active" : ""}
                onClick={() => onChange("all")}
            >
                Todos los artículos
            </button>

            {categories.map((category) => (
                <button
                    key={category.id_categoria}
                    className={
                        selected === category.id_categoria
                            ? "active"
                            : ""
                    }
                    onClick={() => onChange(category.id_categoria)}
                >
                    {category.nombre}
                </button>
            ))}
        </div>
    );
}

export default CategoryTabs;