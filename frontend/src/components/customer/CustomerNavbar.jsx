import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    UtensilsCrossed,
    ShoppingCart,
    ClipboardList,
    MapPin,
    LogOut
} from "lucide-react";

import logo from "../../assets/logo.svg";
import Avatar from "../common/Avatar";
import { logout } from "../../services/authService";
import {
    CART_UPDATED_EVENT,
    getCartCount
} from "../../services/cartService";

function CustomerNavbar() {
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(0);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        updateCartCount();

        function handleCartUpdated() {
            updateCartCount();
        }

        window.addEventListener(CART_UPDATED_EVENT, handleCartUpdated);
        window.addEventListener("storage", handleCartUpdated);

        return () => {
            window.removeEventListener(CART_UPDATED_EVENT, handleCartUpdated);
            window.removeEventListener("storage", handleCartUpdated);
        };
    }, []);

    function updateCartCount() {
        setCartCount(getCartCount());
    }

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

                <NavLink to="/cart" className="customer-cart-nav-link">
                    <span className="customer-cart-icon-wrapper">
                        <ShoppingCart size={18} />

                        {cartCount > 0 && (
                            <span className="customer-cart-count-badge">
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        )}
                    </span>

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