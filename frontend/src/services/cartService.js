const STORAGE_KEY = "ordervista_cart";
export const CART_UPDATED_EVENT = "ordervista-cart-updated";

function notifyCartUpdated() {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getCart() {
    const cart = localStorage.getItem(STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    notifyCartUpdated();
}

export function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
    notifyCartUpdated();
}

export function getCartCount() {
    return getCart().reduce(
        (total, item) => total + Number(item.cantidad || 0),
        0
    );
}

export function addToCart(product) {
    const cart = getCart();

    const existingItem = cart.find(
        item => item.id_producto === product.id_producto
    );

    if (existingItem) {
        existingItem.cantidad += 1;
    } else {
        cart.push({
            ...product,
            cantidad: 1
        });
    }

    saveCart(cart);

    return cart;
}

export function getCartTotal(cart) {
    return cart.reduce(
        (total, item) => total + item.precio * item.cantidad,
        0
    );
}

export function increaseQuantity(idProducto) {
    const cart = getCart();

    const item = cart.find(
        product => product.id_producto === idProducto
    );

    if (item) {
        item.cantidad++;
        saveCart(cart);
    }

    return cart;
}

export function decreaseQuantity(idProducto) {
    const cart = getCart();

    const item = cart.find(
        product => product.id_producto === idProducto
    );

    if (!item) {
        return cart;
    }

    item.cantidad--;

    if (item.cantidad <= 0) {
        return removeFromCart(idProducto);
    }

    saveCart(cart);

    return cart;
}

export function removeFromCart(idProducto) {
    const cart = getCart().filter(
        product => product.id_producto !== idProducto
    );

    saveCart(cart);

    return cart;
}