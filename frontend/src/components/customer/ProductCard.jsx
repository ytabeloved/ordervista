import { Plus } from "lucide-react";

function ProductCard({ product, onView, onAddToCart }) {
    return (
        <article
            className="customer-product-card"
            onClick={() => onView(product)}
        >
            <div className="customer-product-image">
                {product.imagen ? (
                    <img src={product.imagen} alt={product.nombre} />
                ) : (
                    <div className="customer-product-placeholder">
                        {product.nombre}
                    </div>
                )}

                <span className="customer-product-category">
                    {product.categoria}
                </span>
            </div>

            <div className="customer-product-body">
                <div className="customer-product-title">
                    <h3>{product.nombre}</h3>
                    <strong>
                        ${Number(product.precio).toLocaleString("es-CL")}
                    </strong>
                </div>

                <p>{product.descripcion || "Sin descripción"}</p>

                <button
                    type="button"
                    className="customer-add-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }}
                >
                    <Plus size={18} />
                    Agregar al carrito
                </button>
            </div>
        </article>
    );
}

export default ProductCard;