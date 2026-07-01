import logo from "../../assets/logo.svg";
import SidebarItem from "./SidebarItem";

import {
    LayoutDashboard,
    Users,
    Tags,
    Package,
    ChartColumn,
    LogOut,
    ChevronLeft
} from "lucide-react";

// Menú lateral para el perfil Administrador
function AdminSidebar() {

    return (
        <aside className="admin-sidebar">

            <div className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <img src={logo} alt="OrderVista" />
                </div>

                <div>
                    <h2>OrderVista</h2>
                    <p>ADMINISTRATOR</p>
                </div>
            </div>

                <nav className="sidebar-menu">

                    <SidebarItem
                        to="/"
                        icon={<LayoutDashboard size={20} />}
                        label="Dashboard"
                     />

                    <SidebarItem
                        to="/usuarios"
                        icon={<Users size={20} />}
                        label="Users"
                    />

                    <SidebarItem
                        to="/categorias"
                        icon={<Tags size={20} />}
                        label="Categories"
                    />

                    <SidebarItem
                        to="/productos"
                        icon={<Package size={20} />}
                        label="Products"
                    />

                    <SidebarItem
                        to="/reportes"
                        icon={<ChartColumn size={20} />}
                        label="Reports"
                    />

                </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">MS</div>

                    <div>
                        <strong>María Silva</strong>
                        <span>maria@ordervista.com</span>
                    </div>
                </div>

                <button className="sidebar-action">

                    <LogOut size={18} />

                    <span>Sign Out</span>

                </button>

                <button className="sidebar-action">

                    <ChevronLeft size={18} />

                    <span>Collapse</span>

                </button>
            </div>

        </aside>
    );

}

export default AdminSidebar;