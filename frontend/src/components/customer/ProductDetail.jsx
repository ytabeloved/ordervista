import { X, Plus } from "lucide-react";

function ProductDetail({ product, onClose, onAddToCart }) {
    if (!product) return null;

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
                            {product.nombre}
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
                            onAddToCart(product);
                            onClose();
                        }}
                    >
                        <Plus size={18} />
                        Agregar al carrito
                    </button>
                </div>
            </section>
        </div>
    );
}

export default ProductDetail;