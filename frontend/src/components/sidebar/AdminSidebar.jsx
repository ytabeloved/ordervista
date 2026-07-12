import logo from "../../assets/logo.svg";
import SidebarItem from "./SidebarItem";
import { useLocation, useNavigate } from "react-router-dom";
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
    ClipboardList,
    ChefHat,
    ReceiptText
} from "lucide-react";

function AdminSidebar({
    collapsed,
    setCollapsed,
    mobileMenuOpen
}) {
    const navigate = useNavigate();
    const location = useLocation();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    const isOperator =
        Number(user?.id_rol) === 2 ||
        location.pathname.startsWith("/operator") ||
        location.pathname.startsWith("/kitchen") ||
        location.pathname.startsWith("/receipts");

    const userName = user
        ? `${user.nombre || ""} ${user.apellido || ""}`.trim()
        : "Usuario";

    const userEmail = user?.email || "sin correo";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const adminMenu = [
        {
            to: "/",
            icon: <LayoutDashboard size={20} />,
            label: "Dashboard"
        },
        {
            to: "/usuarios",
            icon: <Users size={20} />,
            label: "Users"
        },
        {
            to: "/categorias",
            icon: <Tags size={20} />,
            label: "Categories"
        },
        {
            to: "/productos",
            icon: <Package size={20} />,
            label: "Products"
        },
        {
            to: "/reportes",
            icon: <ChartColumn size={20} />,
            label: "Reports"
        }
    ];

    const operatorMenu = [
        {
            to: "/operator",
            icon: <ClipboardList size={20} />,
            label: "Orders"
        },
        {
            to: "/kitchen",
            icon: <ChefHat size={20} />,
            label: "Kitchen"
        },
        {
            to: "/receipts",
            icon: <ReceiptText size={20} />,
            label: "Receipt"
        }
    ];

    const menuItems = isOperator ? operatorMenu : adminMenu;

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
                    <p>{isOperator ? "OPERATOR" : "ADMINISTRATOR"}</p>
                </div>
            </div>

            <nav className="sidebar-menu">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.to}
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <Avatar
                        firstName={user?.nombre}
                        lastName={user?.apellido}
                        size="sm"
                    />

                    <div>
                        <strong>{userName || "Usuario"}</strong>
                        <span>{userEmail}</span>
                    </div>
                </div>

                <button
                    className="sidebar-action"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                    <span>Sign Out</span>
                </button>

                <button
                    className="sidebar-action"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    <ChevronLeft size={18} />
                    <span>Collapse</span>
                </button>
            </div>
        </aside>
    );
}

export default AdminSidebar;