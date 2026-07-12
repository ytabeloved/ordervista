function SalesByDayTable({ sales = [] }) {
    return (
        <section className="report-card">
            <h2>Ventas estimadas por día</h2>

            {sales.length === 0 ? (
                <p>No hay ventas registradas en el período.</p>
            ) : (
                <div className="report-table-wrapper">
                    <table className="report-table">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Pedidos</th>
                                <th>Ventas estimadas</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sales.map((day) => (
                                <tr key={day.fecha}>
                                    <td>
                                        {new Date(day.fecha).toLocaleDateString("es-CL")}
                                    </td>
                                    <td>{day.total_pedidos}</td>
                                    <td>
                                        ${Number(day.ventas).toLocaleString("es-CL")}
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

export default SalesByDayTable;