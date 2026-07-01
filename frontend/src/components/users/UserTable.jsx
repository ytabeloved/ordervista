import { Pencil, Trash2 } from "lucide-react";

function getInitials(user) {
    const nombre = user.nombre?.charAt(0) || "";
    const apellido = user.apellido?.charAt(0) || "";

    return `${nombre}${apellido}`.toUpperCase();
}

function UserTable({ users, onEdit, onDelete }) {
    return (
        <div className="users-table-card">
            <table className="users-table">
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id_usuario}>
                            <td>
                                <div className="user-cell">
                                    <div className="user-avatar">
                                        {getInitials(user)}
                                    </div>

                                    <strong>
                                        {user.nombre} {user.apellido}
                                    </strong>
                                </div>
                            </td>

                            <td>{user.email}</td>
                            <td>{user.telefono || "Sin teléfono"}</td>

                            <td>
                                <span className={`role-badge ${user.rol?.toLowerCase()}`}>
                                    {user.rol}
                                </span>
                            </td>

                            <td>
                                <span className={user.activo ? "status-badge active" : "status-badge inactive"}>
                                    {user.activo ? "Active" : "Inactive"}
                                </span>
                            </td>

                            <td>
                               <button className="icon-button"  onClick={() => onEdit(user)}>
                                    <Pencil size={18} />
                                </button>

                                <button className="icon-button delete" onClick={() => onDelete(user)}>
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {users.length === 0 && (
                <p className="empty-table">No se encontraron usuarios.</p>
            )}
        </div>
    );
}

export default UserTable;