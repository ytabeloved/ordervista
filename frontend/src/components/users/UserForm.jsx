// Formulario reutilizable para crear y editar usuarios
function UserForm({ formData, setFormData, onSubmit, onCancel, submitText, mode = "create" }) {

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

            <label>Apellido</label>
            <input
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                required
            />

            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            {mode === "create" && (
                <>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </>
            )}

            <label>Teléfono</label>
            <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
            />

            <div className="form-row">
                <div>
                    <label>Rol</label>
                    <select
                        name="id_rol"
                        value={formData.id_rol}
                        onChange={handleChange}
                        required
                    >
                        <option value="1">Administrador</option>
                        <option value="2">Operador</option>
                        <option value="3">Cliente</option>
                    </select>
                </div>

                <div>
                    <label>Estado</label>
                    <select
                        name="activo"
                        value={formData.activo}
                        onChange={handleChange}
                    >
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                </div>
            </div>

            <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={onCancel}>
                    Cancelar
                </button>

                <button type="submit" className="btn-primary">
                    {submitText}
                </button>
            </div>
        </form>
    );
}

export default UserForm;