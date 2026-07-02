import "../../styles/topbar.css";

// Barra superior del panel administrador
function TopBar() {
    return (
        <header className="topbar">
            <div className="topbar-left">
                <h1>Dashboard</h1>

                <p>
                    Bienvenido al panel de administración de OrderVista.
                </p>
            </div>
        </header>
    );
}

export default TopBar;