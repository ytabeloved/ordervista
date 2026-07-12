import { useEffect, useState } from "react";
import { Search, Trash2, Minus, Plus, Send } from "lucide-react";

import CategoryTabs from "../../components/customer/CategoryTabs";
import ProductGrid from "../../components/customer/ProductGrid";
import ProductDetail from "../customer/ProductDetail";

import { getMenu } from "../../services/menuService";
import { createInPersonOrder } from "../../services/orderService";

import "../../styles/customer.css";
import "../../styles/operator.css";

function CreateInPersonOrder() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadMenu();
    }, []);

    async function loadMenu() {
        try {
            const data = await getMenu();
            setCategories(data.categories || []);
            setProducts(data.products || []);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar el menú.");
        } finally {
            setLoading(false);
        }
    }

    function addProduct(product) {
        setCart((currentCart) => {
            const existingItem = currentCart.find(
                (item) => item.id_producto === product.id_producto
            );

            if (existingItem) {
                return currentCart.map((item) =>
                    item.id_producto === product.id_producto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [
                ...currentCart,
                {
                    ...product,
                    cantidad: 1
                }
            ];
        });
    }

    function increaseQuantity(idProducto) {
        setCart((currentCart) =>
            currentCart.map((item) =>
                item.id_producto === idProducto
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            )
        );
    }

    function decreaseQuantity(idProducto) {
        setCart((currentCart) =>
            currentCart
                .map((item) =>
                    item.id_producto === idProducto
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
                .filter((item) => item.cantidad > 0)
        );
    }

    function removeItem(idProducto) {
        setCart((currentCart) =>
            currentCart.filter((item) => item.id_producto !== idProducto)
        );
    }

    function clearOrder() {
        setCart([]);
    }

    const total = cart.reduce(
        (sum, item) => sum + Number(item.precio) * item.cantidad,
        0
    );

    async function handleCreateOrder() {
        if (cart.length === 0) {
            alert("Debes agregar productos al pedido.");
            return;
        }

        const orderData = {
            total,
            observacion: "Pedido creado en local",
            items: cart.map((item) => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: Number(item.precio),
                subtotal: Number(item.precio) * item.cantidad
            }))
        };

        try {
            setSaving(true);

            const response = await createInPersonOrder(orderData);

            alert(`Pedido presencial creado correctamente. N° ${response.id_pedido}`);
            clearOrder();
        } catch (error) {
            console.error(error.response?.data || error);
            alert(error.response?.data?.mensaje || "No fue posible crear el pedido presencial.");
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="operator-new-order-page">
            <header className="operator-orders-header">
                <div>
                    <h1>Nuevo Pedido Presencial</h1>
                    <p>Selecciona productos del menú y crea un pedido en local.</p>
                </div>

                <button
                    type="button"
                    className="operator-create-order-button"
                    onClick={handleCreateOrder}
                    disabled={saving || cart.length === 0}
                >
                    <Send size={18} />
                    {saving ? "Creando..." : "Crear Pedido"}
                </button>
            </header>

            <div className="operator-new-order-layout">
                <div className="operator-menu-panel">
                    <div className="operator-search-box full">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <p>Cargando menú...</p>
                    ) : (
                        <>
                            <CategoryTabs
                                categories={categories}
                                selected={selectedCategory}
                                onChange={setSelectedCategory}
                            />

                            <ProductGrid
                                products={products}
                                selectedCategory={selectedCategory}
                                search={search}
                                onView={setSelectedProduct}
                                onAddToCart={addProduct}
                            />
                        </>
                    )}
                </div>

                <aside className="operator-order-summary">
                    <div className="operator-order-summary-header">
                        <h2>Pedido Actual</h2>

                        {cart.length > 0 && (
                            <button type="button" onClick={clearOrder}>
                                Limpiar
                            </button>
                        )}
                    </div>

                    {cart.length === 0 ? (
                        <div className="operator-empty-cart">
                            No hay productos agregados.
                        </div>
                    ) : (
                        <div className="operator-order-cart-list">
                            {cart.map((item) => (
                                <article
                                    key={item.id_producto}
                                    className="operator-order-cart-item"
                                >
                                    <div>
                                        <strong>{item.nombre}</strong>
                                        <p>
                                            ${Number(item.precio).toLocaleString("es-CL")} c/u
                                        </p>
                                    </div>

                                    <div className="operator-cart-controls">
                                        <button
                                            type="button"
                                            onClick={() => decreaseQuantity(item.id_producto)}
                                        >
                                            <Minus size={14} />
                                        </button>

                                        <span>{item.cantidad}</span>

                                        <button
                                            type="button"
                                            onClick={() => increaseQuantity(item.id_producto)}
                                        >
                                            <Plus size={14} />
                                        </button>

                                        <button
                                            type="button"
                                            className="operator-remove-item"
                                            onClick={() => removeItem(item.id_producto)}
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    <div className="operator-order-summary-total">
                        <span>Total</span>
                        <strong>${total.toLocaleString("es-CL")}</strong>
                    </div>

                    <button
                        type="button"
                        className="operator-create-order-button full"
                        onClick={handleCreateOrder}
                        disabled={saving || cart.length === 0}
                    >
                        <Send size={18} />
                        {saving ? "Creando..." : "Crear Pedido"}
                    </button>
                </aside>
            </div>

            <ProductDetail
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
                onAddToCart={addProduct}
            />
        </section>
    );
}

export default CreateInPersonOrder;