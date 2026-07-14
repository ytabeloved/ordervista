import { useEffect, useState } from "react";

import CustomerLayout from "../../components/customer/CustomerLayout";

import CartItem from "../../components/customer/CartItem";
import OrderSummary from "../../components/customer/OrderSummary";
import OrderTypeSelector from "../../components/customer/OrderTypeSelector";

import AddressSelector from "../../components/customer/AddressSelector";

import { getOrderTypes } from "../../services/orderTypeService";

import {
    getCart,
    getCartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} from "../../services/cartService";

import { createOrder } from "../../services/orderService";

import "../../styles/customer.css";

function Cart() {

    const [cart, setCart] = useState([]);

    const [orderTypes, setOrderTypes] = useState([]);
    const [orderType, setOrderType] = useState(null);
    const [orderTypeId, setOrderTypeId] = useState(null);

    const [selectedAddress, setSelectedAddress] = useState(null);

    async function loadOrderTypes() {
    try {
        const data = await getOrderTypes();
        setOrderTypes(data);

        if (data.length > 0) {
            setOrderTypeId(data[0].id_tipo_pedido);
        }
    } catch (error) {
        console.error(error);
        alert("No fue posible cargar los tipos de pedido.");
    }
}

    useEffect(() => {

        loadOrderTypes();
        refreshCart();

    }, []);

    function refreshCart() {

        setCart(getCart());

    }

    function handleIncrease(idProducto) {
    const result = increaseQuantity(idProducto);

        if (!result.ok) {
            alert(result.message);
        }

        refreshCart();
    }

    function handleDecrease(idProducto) {
        const result = decreaseQuantity(idProducto);

        if (!result.ok) {
            alert(result.message);
        }

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

    const selectedOrderType = orderTypes.find(
        (type) => type.id_tipo_pedido === orderTypeId
    );

    const isDelivery =
        selectedOrderType?.nombre?.toLowerCase().includes("delivery") ||
        selectedOrderType?.nombre?.toLowerCase().includes("entrega");

    async function handlePlaceOrder() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    if (orderType === isDelivery && !selectedAddress) {
        alert("Debes seleccionar una dirección de entrega.");
        return;
    }

    const orderData = {
        id_tipo_pedido: orderTypeId,

        id_direccion: isDelivery ? selectedAddress : null,

        total,

        observacion: "",

        items: cart.map((item) => ({
            id_producto: item.id_producto,
            cantidad: item.cantidad,
            precio_unitario: Number(item.precio),
            subtotal: Number(item.precio) * item.cantidad
        }))
    };

    try {
        const response = await createOrder(orderData);

        clearCart();
        refreshCart();

        alert(`Pedido creado correctamente. N° ${response.id_pedido}`);
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.mensaje || "No fue posible crear el pedido.");
    }
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

                                orderTypeId={orderTypeId}

                                setOrderTypeId={setOrderTypeId}

                                orderTypes={orderTypes}

                            />

                            <AddressSelector

                                orderType={isDelivery ? "delivery" : "pickup"}

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