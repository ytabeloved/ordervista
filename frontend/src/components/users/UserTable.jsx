import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";
import UserMobileCard from "./UserMobileCard";
import Avatar from "../common/Avatar";


function getRoleType(role) {
    switch (role) {
        case "Administrador":
            return "admin";
        case "Operador":
            return "operator";
        default:
            return "customer";
    }
}

function UserTable({ users, onEdit, onDelete }) {
    return (
        <>
            {/* ======== Vista Desktop ======== */}

            <div className="users-table-card">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Rol</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id_usuario}>
                                <td>
                                    <div className="user-cell">
                                        <Avatar
                                            firstName={user.nombre}
                                            lastName={user.apellido}
                                        />

                                        <strong>
                                            {user.nombre} {user.apellido}
                                        </strong>
                                    </div>
                                </td>

                                <td>{user.email}</td>

                                <td>
                                    {user.telefono || "Sin teléfono"}
                                </td>

                                <td>
                                    <Badge
                                        type={getRoleType(user.rol)}
                                    >
                                        {user.rol}
                                    </Badge>
                                </td>

                                <td>
                                    <Badge
                                        type={
                                            user.activo
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {user.activo
                                            ? "Active"
                                            : "Inactive"}
                                    </Badge>
                                </td>

                                <td>
                                    <ActionButtons
                                        onEdit={() => onEdit(user)}
                                        onDelete={() => onDelete(user)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="empty-table">
                        No se encontraron usuarios.
                    </p>
                )}
            </div>

            {/* ======== Vista Mobile ======== */}

            <div className="users-mobile-list">
                {users.map((user) => (
                    <UserMobileCard
                        key={user.id_usuario}
                        user={user}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}

export default UserTable;