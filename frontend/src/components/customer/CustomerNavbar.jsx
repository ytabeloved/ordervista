import { NavLink, useNavigate } from "react-router-dom";
import {
    UtensilsCrossed,
    ShoppingCart,
    ClipboardList,
    MapPin,
    LogOut,
    User
} from "lucide-react";

import logo from "../../assets/logo.svg";
import Avatar from "../common/Avatar";
import { logout } from "../../services/authService";

function CustomerNavbar() {

    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (

        <header className="customer-navbar">

            <div className="customer-navbar-left">

                <div className="customer-brand">

                    <img
                        src={logo}
                        alt="OrderVista"
                    />

                    <h2>OrderVista</h2>

                </div>

            </div>

            <nav className="customer-navbar-menu">

                <NavLink to="/menu">
                    <UtensilsCrossed size={18} />
                    <span>Menu</span>
                </NavLink>

                <NavLink to="/cart">
                    <ShoppingCart size={18} />
                    <span>Carrito</span>
                </NavLink>

                <NavLink to="/orders">
                    <ClipboardList size={18} />
                    <span>Mis Pedidos</span>
                </NavLink>

                <NavLink to="/addresses">
                    <MapPin size={18} />
                    <span>Direcciones</span>
                </NavLink>

            </nav>

            <div className="customer-navbar-right">

                <div className="customer-user">

                    <Avatar
                        firstName={user?.nombre}
                        lastName={user?.apellido}
                        size="sm"
                    />

                    <span>
                        {user?.nombre}
                    </span>

                </div>

                <button
                    className="customer-logout"
                    onClick={handleLogout}
                >
                    <LogOut size={18}/>
                </button>

            </div>

        </header>

    );

}

export default CustomerNavbar;