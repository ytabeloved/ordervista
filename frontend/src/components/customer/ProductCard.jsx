import { Plus } from "lucide-react";

function ProductCard({
    product,
    onView,
    onAddToCart
}) {
    return (
        <article className="customer-product-card">

            <div
                className="customer-product-image"
                onClick={() => onView?.(product)}
            >
                {product.imagen ? (
                    <img
                        src={product.imagen}
                        alt={product.nombre}
                    />
                ) : (
                    <div className="customer-product-placeholder">
                        Sin imagen
                    </div>
                )}

                <span className="customer-product-category">
                    {product.categoria}
                </span>
            </div>

            <div className="customer-product-body">

                <div
                    className="customer-product-title"
                    onClick={() => onView?.(product)}
                >

                    <h3>{product.nombre}</h3>

                    <strong>
                        $
                        {Number(product.precio).toLocaleString("es-CL")}
                    </strong>

                </div>

                <p
                    onClick={() => onView?.(product)}
                >
                    {product.descripcion || "Sin descripción"}
                </p>

                <button
                    type="button"
                    className="customer-add-button"
                    onClick={() => onAddToCart?.(product)}
                >

                    <Plus size={18} />

                    Add to Cart

                </button>

            </div>

        </article>
    );
}

export default ProductCard;