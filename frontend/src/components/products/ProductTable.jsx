import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";
import TableCard from "../common/TableCard";

import ProductImage from "./ProductImage";
import CategoryChip from "./CategoryChip";
import ProductMobileCard from "./ProductMobileCard";

function ProductTable({ products, onEdit, onDelete }) {
    return (
        <>
            <TableCard
                items={products}
                emptyMessage="No products found."
            >
                <table className="products-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id_producto}>
                                <td>
                                    <ProductImage
                                        image={product.imagen}
                                        name={product.nombre}
                                        description={product.descripcion}
                                    />
                                </td>

                                <td>
                                    <CategoryChip name={product.categoria} />
                                </td>

                                <td>
                                    <strong>
                                        ${Number(product.precio || 0).toLocaleString("es-CL")}
                                    </strong>
                                </td>

                                <td>{product.stock}</td>

                                <td>
                                    <Badge type={product.activo ? "active" : "inactive"}>
                                        {product.activo ? "Active" : "Inactive"}
                                    </Badge>
                                </td>

                                <td>
                                    <ActionButtons
                                        onEdit={() => onEdit(product)}
                                        onDelete={() => onDelete(product)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableCard>

            <div className="products-mobile-list">
                {products.map((product) => (
                    <ProductMobileCard
                        key={product.id_producto}
                        product={product}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}

export default ProductTable;