import { useEffect, useState } from "react";

import CustomerLayout from "../../components/customer/CustomerLayout";

import CartItem from "../../components/customer/CartItem";
import OrderSummary from "../../components/customer/OrderSummary";
import OrderTypeSelector from "../../components/customer/OrderTypeSelector";

import AddressSelector from "../../components/customer/AddressSelector";

import {
    getCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} from "../../services/cartService";

import "../../styles/customer.css";

function Cart() {

    const [cart, setCart] = useState([]);

    const [orderType, setOrderType] = useState("delivery");

    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {

        refreshCart();

    }, []);

    function refreshCart() {

        setCart(getCart());

    }

    function handleIncrease(idProducto) {

        increaseQuantity(idProducto);

        refreshCart();

    }

    function handleDecrease(idProducto) {

        decreaseQuantity(idProducto);

        refreshCart();

    }

    function handleRemove(idProducto) {

        removeFromCart(idProducto);

        refreshCart();

    }

    function handleClearCart() {

        clearCart();

        refreshCart();

    }

    function handlePlaceOrder() {

        alert("OR-48");

    }

    const subtotal = getCartTotal(cart);

    const delivery = orderType === "delivery"
        ? 0
        : 0;

    const tax = 0;

    const total = subtotal + delivery + tax;

    return (

        <CustomerLayout>

            <section className="customer-cart">

                <header className="customer-menu-header">

                    <h1>Mi Carrito</h1>

                    <p>

                        Revisa tus productos antes de confirmar el pedido.

                    </p>

                </header>

                {cart.length === 0 ? (

                    <div className="customer-empty-state">

                        <h3>

                            Tu carrito está vacío.

                        </h3>

                    </div>

                ) : (

                    <div className="cart-layout">

                        <div>

                            <div className="cart-list">

                                {cart.map(item => (

                                    <CartItem

                                        key={item.id_producto}

                                        item={item}

                                        onIncrease={handleIncrease}

                                        onDecrease={handleDecrease}

                                        onRemove={handleRemove}

                                    />

                                ))}

                            </div>

                            <OrderTypeSelector

                                orderType={orderType}

                                setOrderType={setOrderType}

                            />

                            <AddressSelector

                                orderType={orderType}

                                selectedAddress={selectedAddress}

                                setSelectedAddress={setSelectedAddress}

                            />

                        </div>

                        <OrderSummary

                            subtotal={subtotal}

                            delivery={delivery}

                            tax={tax}

                            total={total}

                            onPlaceOrder={handlePlaceOrder}

                            onClearCart={handleClearCart}

                        />

                    </div>

                )}

            </section>

        </CustomerLayout>

    );

}

export default Cart;