import { useLocation } from "react-router-dom";
import "../../styles/topbar.css";

function TopBar() {
    const location = useLocation();

    const pages = {
        "/": {
            title: "Dashboard",
            subtitle: "Bienvenido al panel de administración de OrderVista."
        },
        "/usuarios": {
            title: "Usuarios",
            subtitle: "Gestiona los usuarios del sistema."
        },
        "/categorias": {
            title: "Categorías",
            subtitle: "Administra las categorías del menú."
        },
        "/productos": {
            title: "Productos",
            subtitle: "Gestiona los productos disponibles."
        },
        "/reportes": {
            title: "Reportes",
            subtitle: "Consulta indicadores y métricas del sistema."
        },
        "/operator": {
            title: "Operator Panel",
            subtitle: "Gestión operativa de pedidos."
        },
        "/operator/new-order": {
            title: "New Order",
            subtitle: "Crear un nuevo pedido."
        },
        "/kitchen": {
            title: "Kitchen",
            subtitle: "Gestión de comandas de cocina."
        },
        "/receipts": {
            title: "Receipt",
            subtitle: "Genera comprobantes operativos de pedidos completados."
        }
    };

    const currentPage = pages[location.pathname] || {
        title: "OrderVista",
        subtitle: ""
    };

    return (
        <header className="topbar">
            <div className="topbar-left">
                <h1>{currentPage.title}</h1>

                {currentPage.subtitle && (
                    <p>{currentPage.subtitle}</p>
                )}
            </div>
        </header>
    );
}

export default TopBar;