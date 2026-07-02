function CategoryForm({
    formData,
    setFormData,
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

export default CategoryForm;