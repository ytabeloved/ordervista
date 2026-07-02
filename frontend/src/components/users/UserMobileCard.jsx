import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";
import Avatar from "../common/Avatar";

function getRoleType(role) {
    if (role === "Administrador") return "admin";
    if (role === "Operador") return "operator";
    return "customer";
}

function UserMobileCard({ user, onEdit, onDelete }) {
    return (
        <article className="user-mobile-card">
            <div className="user-mobile-main">
                <Avatar
                    firstName={user.nombre}
                    lastName={user.apellido}
                />

                <div>
                    <h3>{user.nombre} {user.apellido}</h3>
                    <p>{user.email}</p>
                </div>
            </div>

            <div className="user-mobile-footer">
                <div className="user-mobile-badges">
                    <Badge type={getRoleType(user.rol)}>
                        {user.rol}
                    </Badge>

                    <Badge type={user.activo ? "active" : "inactive"}>
                        {user.activo ? "Active" : "Inactive"}
                    </Badge>
                </div>

                <ActionButtons
                    onEdit={() => onEdit(user)}
                    onDelete={() => onDelete(user)}
                />
            </div>
        </article>
    );
}

export default UserMobileCard;