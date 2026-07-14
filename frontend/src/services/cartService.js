const STORAGE_KEY = "ordervista_cart";
export const CART_UPDATED_EVENT = "ordervista-cart-updated";

function notifyCartUpdated() {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

function getStock(product) {
    return Number(product.stock || 0);
}

function isAvailable(product) {
    const productIsActive =
        product.activo === true ||
        product.activo === 1 ||
        product.activo === undefined;

    return productIsActive && getStock(product) > 0;
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

    if (!isAvailable(product)) {
        return {
            ok: false,
            cart,
            message: `"${product.nombre}" no tiene stock disponible.`
        };
    }

    const existingItem = cart.find(
        item => item.id_producto === product.id_producto
    );

    if (existingItem) {
        if (existingItem.cantidad >= getStock(product)) {
            return {
                ok: false,
                cart,
                message: `No puedes agregar más unidades de "${product.nombre}". Stock disponible: ${product.stock}.`
            };
        }

        existingItem.cantidad += 1;
        existingItem.stock = product.stock;
    } else {
        cart.push({
            ...product,
            cantidad: 1
        });
    }

    saveCart(cart);

    return {
        ok: true,
        cart,
        message: `"${product.nombre}" agregado al carrito.`
    };
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

    if (!item) {
        return {
            ok: false,
            cart,
            message: "Producto no encontrado en el carrito."
        };
    }

    if (item.cantidad >= getStock(item)) {
        return {
            ok: false,
            cart,
            message: `No puedes agregar más unidades de "${item.nombre}". Stock disponible: ${item.stock}.`
        };
    }

    item.cantidad++;

    saveCart(cart);

    return {
        ok: true,
        cart
    };
}

export function decreaseQuantity(idProducto) {
    const cart = getCart();

    const item = cart.find(
        product => product.id_producto === idProducto
    );

    if (!item) {
        return {
            ok: false,
            cart,
            message: "Producto no encontrado en el carrito."
        };
    }

    item.cantidad--;

    if (item.cantidad <= 0) {
        return removeFromCart(idProducto);
    }

    saveCart(cart);

    return {
        ok: true,
        cart
    };
}

export function removeFromCart(idProducto) {
    const cart = getCart().filter(
        product => product.id_producto !== idProducto
    );

    saveCart(cart);

    return {
        ok: true,
        cart
    };
}