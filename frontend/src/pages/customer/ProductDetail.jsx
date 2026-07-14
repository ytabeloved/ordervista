import { X, Plus } from "lucide-react";
import { addToCart } from "../../services/cartService";

function ProductDetail({ product, onClose, onAddToCart }) {
    if (!product) {
        return null;
    }

    return (
        <div className="product-detail-overlay">
            <section className="product-detail-modal">
                <button
                    type="button"
                    className="product-detail-close"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <div className="product-detail-image">
                    {product.imagen ? (
                        <img src={product.imagen} alt={product.nombre} />
                    ) : (
                        <div className="customer-product-placeholder">
                            Sin imagen
                        </div>
                    )}
                </div>

                <div className="product-detail-info">
                    <span className="customer-product-category">
                        {product.categoria}
                    </span>

                    <h1>{product.nombre}</h1>

                    <p>{product.descripcion || "Sin descripción"}</p>

                    <strong>
                        ${Number(product.precio).toLocaleString("es-CL")}
                    </strong>

                    <button
                        type="button"
                        className="customer-add-button"
                        onClick={() => {

                            addToCart(product);

                            onAddToCart?.(product);

                        }}
                    >
                        <Plus size={18} />
                        Agreguee al carrito
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;