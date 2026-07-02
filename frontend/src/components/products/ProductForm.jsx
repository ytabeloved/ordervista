function ProductForm({
    formData,
    setFormData,
    categories,
    onSubmit,
    onCancel,
    submitText
}) {
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    return (
        <form className="user-form" onSubmit={onSubmit}>
            <label>Nombre</label>
            <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
            />

            <label>Descripción</label>
            <input
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
            />

            <label>Categoría</label>
            <select
                name="id_categoria"
                value={formData.id_categoria}
                onChange={handleChange}
                required
            >
                <option value="">Seleccione una categoría</option>

                {categories.map((category) => (
                    <option
                        key={category.id_categoria}
                        value={category.id_categoria}
                    >
                        {category.nombre}
                    </option>
                ))}
            </select>

            <div className="form-row">
                <div>
                    <label>Precio</label>
                    <input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <label>URL Imagen</label>
            <input
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://..."
            />

            <label>Estado</label>
            <select
                name="activo"
                value={formData.activo}
                onChange={handleChange}
            >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
            </select>

            <div className="form-actions">
                <button
                    type="button"
                    className="btn-secondary"
                    onClick={onCancel}
                >
                    Cancelar
                </button>

                <button type="submit" className="btn-primary">
                    {submitText}
                </button>
            </div>
        </form>
    );
}

export default ProductForm;