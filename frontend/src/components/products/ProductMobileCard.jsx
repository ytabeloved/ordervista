import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";

import ProductImage from "./ProductImage";
import CategoryChip from "./CategoryChip";

function ProductMobileCard({ product, onEdit, onDelete }) {
    return (
        <article className="product-mobile-card">

            <ProductImage
                image={product.imagen}
                name={product.nombre}
                description={product.descripcion}
                size="lg"
            />

            <div className="product-mobile-meta">

                <CategoryChip
                    name={product.categoria}
                />

                <strong>
                    $
                    {Number(product.precio || 0).toLocaleString("es-CL")}
                </strong>

            </div>

            <div className="product-stock">

                Stock:
                <strong> {product.stock}</strong>

            </div>

            <div className="product-mobile-footer">

                <Badge
                    type={
                        product.activo
                            ? "active"
                            : "inactive"
                    }
                >
                    {
                        product.activo
                            ? "Active"
                            : "Inactive"
                    }
                </Badge>

                <ActionButtons
                    onEdit={() => onEdit(product)}
                    onDelete={() => onDelete(product)}
                />

            </div>

        </article>
    );
}

export default ProductMobileCard;