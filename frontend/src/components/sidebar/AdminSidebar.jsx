import logo from "../../assets/logo.svg";
import SidebarItem from "./SidebarItem";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authService";
import Avatar from "../common/Avatar";


import {
    LayoutDashboard,
    Users,
    Tags,
    Package,
    ChartColumn,
    LogOut,
    ChevronLeft,
} from "lucide-react";

// Menú lateral para el perfil Administrador
function AdminSidebar({ 
    collapsed, 
    setCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen
}) {

    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const userName = user
        ? `${user.nombre} ${user.apellido}`
        : "Usuario";

    const userEmail = user?.email || "sin correo";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
            <aside
                className={
                    `admin-sidebar
                    ${collapsed ? "collapsed" : ""}
                    ${mobileMenuOpen ? "mobile-open" : ""}`
                }
            >

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
                    <Avatar
                        firstName={user?.nombre}
                        lastName={user?.apellido}
                        size="sm"
                    />

                    <div>
                        <strong>{userName}</strong>
                        <span>{userEmail}</span>
                    </div>
                </div>

                <button className="sidebar-action" 
                onClick={handleLogout}>

                    <LogOut size={18} />

                    <span>Sign Out</span>

                </button>

                <button className="sidebar-action" onClick={() => setCollapsed(!collapsed)}>

                    <ChevronLeft size={18} />

                    <span>Collapse</span>

                </button>
            </div>

        </aside>
    );

}

export default AdminSidebar;