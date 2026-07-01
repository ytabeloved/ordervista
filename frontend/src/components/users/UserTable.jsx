import { Pencil, Trash2 } from "lucide-react";

// Tabla de usuarios
function UserTable({ users }) {

    return (

        <table className="users-table">

            <thead>

                <tr>

                    <th>Nombre</th>

                    <th>Correo</th>

                    <th>Teléfono</th>

                    <th>Rol</th>

                    <th>Estado</th>

                    <th>Acciones</th>

                </tr>

            </thead>

            <tbody>

                {users.map((user) => (

                    <tr key={user.id_usuario}>

                        <td>

                            {user.nombre} {user.apellido}

                        </td>

                        <td>{user.email}</td>

                        <td>{user.telefono}</td>

                        <td>{user.rol}</td>

                        <td>

                            {user.activo
                                ? "Activo"
                                : "Inactivo"}

                        </td>

                        <td>

                            <button className="icon-button">

                                <Pencil size={18} />

                            </button>

                            <button className="icon-button delete">

                                <Trash2 size={18} />

                            </button>

                        </td>

                    </tr>

                ))}

            </tbody>

        </table>

    );

}

export default UserTable;