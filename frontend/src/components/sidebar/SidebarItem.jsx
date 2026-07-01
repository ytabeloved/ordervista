import { NavLink } from "react-router-dom";

// Item reutilizable para cada opción del menú lateral
function SidebarItem({ to, icon, label }) {

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? "sidebar-item active" : "sidebar-item"
            }
        >
            <span className="sidebar-item-icon">
                {icon}
            </span>

            <span className="sidebar-item-label">
                {label}
            </span>
        </NavLink>
    );

}

export default SidebarItem;