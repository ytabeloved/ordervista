function AddressForm({
    formData,
    setFormData,
    onSubmit,
    onCancel,
    submitText
}) {
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    }

    return (
        <form className="user-form" onSubmit={onSubmit}>
            <label>Dirección</label>
            <input
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                required
            />

            <label>Comuna</label>
            <input
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                required
            />

            <label>Ciudad</label>
            <input
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                required
            />

            <label>Referencia</label>
            <input
                name="referencia"
                value={formData.referencia}
                onChange={handleChange}
            />

            <label className="checkbox-field">
                <input
                    type="checkbox"
                    name="principal"
                    checked={formData.principal}
                    onChange={handleChange}
                />
                Marcar como dirección principal
            </label>

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

export default AddressForm;