import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">OV</div>

            <nav className="sidebar-nav">
                <NavLink to="/" className="sidebar-link" title="Dashboard">
                    ▦
                </NavLink>

                <NavLink to="/usuarios" className="sidebar-link" title="Usuarios">
                    ♙
                </NavLink>

                <NavLink to="/categorias" className="sidebar-link" title="Categorías">
                    ◇
                </NavLink>

                <NavLink to="/productos" className="sidebar-link" title="Productos">
                    □
                </NavLink>
            </nav>
        </aside>
    );
}

export default Sidebar;