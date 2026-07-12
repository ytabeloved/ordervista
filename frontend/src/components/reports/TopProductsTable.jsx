function TopProductsTable({ products = [] }) {
    return (
        <section className="report-card">
            <h2>Productos más vendidos</h2>

            {products.length === 0 ? (
                <p>No hay productos vendidos en el período.</p>
            ) : (
                <div className="report-table-wrapper">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th>Total vendido</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id_producto}>
                                    <td>{product.nombre}</td>
                                    <td>{product.categoria || "Sin categoría"}</td>
                                    <td>{product.cantidad_vendida}</td>
                                    <td>
                                        ${Number(product.total_vendido).toLocaleString("es-CL")}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    );
}

export default TopProductsTable;