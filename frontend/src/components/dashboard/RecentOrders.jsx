import { recentOrders } from "../../data/dashboardData";

function RecentOrders() {

    return (

        <section className="dashboard-card">

            <h3>Pedidos recientes</h3>

            <table className="dashboard-table">

                <thead>

                    <tr>

                        <th>Pedido</th>
                        <th>Cliente</th>
                        <th>Estado</th>
                        <th>Total</th>

                    </tr>

                </thead>

                <tbody>

                    {recentOrders.map((order) => (

                        <tr key={order.id}>

                            <td>{order.id}</td>

                            <td>{order.cliente}</td>

                            <td>

                                <span
                                    className={
                                        "status " +
                                        order.estado.toLowerCase().replace(" ", "-")
                                    }
                                >
                                    {order.estado}
                                </span>

                            </td>

                            <td>{order.total}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </section>

    );

}

export default RecentOrders;