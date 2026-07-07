const STORAGE_KEY = "ordervista_cart";

export function getCart() {
    const cart = localStorage.getItem(STORAGE_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function clearCart() {
    localStorage.removeItem(STORAGE_KEY);
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