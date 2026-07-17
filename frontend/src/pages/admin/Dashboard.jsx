import { useEffect, useState } from "react";
import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    TrendingUp,
    ClipboardList
} from "lucide-react";

import { getDashboardReport } from "../../services/reportService";
import { formatOrderNumber, getOrderType } from "../../utils/orderHelpers";

import "../../styles/dashboard.css";

function Dashboard() {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    async function loadDashboard() {
        try {
            const data = await getDashboardReport();
            setReport(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar el dashboard.");
        } finally {
            setLoading(false);
        }
    }

    const summary = report?.summary || {};
    const metrics = report?.metrics || {};
    const salesByDay = report?.salesByDay || [];
    const salesByCategory = report?.salesByCategory || [];
    const topProducts = report?.topProducts || [];
    const recentOrders = report?.recentOrders || [];
    const ordersByStatus = report?.ordersByStatus || [];

    const maxSales = Math.max(...salesByDay.map((item) => Number(item.ventas)), 1);
    const maxCategory = Math.max(...salesByCategory.map((item) => Number(item.total_vendido)), 1);
    const totalStatus = ordersByStatus.reduce((sum, item) => sum + Number(item.total), 0);

    const cards = [
        {
            label: "Ventas estimadas",
            value: `$${Number(summary.ventas_estimadas || 0).toLocaleString("es-CL")}`,
            detail: "Ventas estimadas acumuladas",
            icon: <DollarSign size={22} />,
            type: "positive"
        },
        {
            label: "Pedidos de hoy",
            value: Number(metrics.orders_today || 0).toLocaleString("es-CL"),
            detail: `${Number(summary.total_pedidos || 0)} pedidos históricos`,
            icon: <ShoppingBag size={22} />,
            type: "positive"
        },
        {
            label: "Clientes registrados",
            value: Number(metrics.total_customers || 0).toLocaleString("es-CL"),
            detail: `${Number(summary.clientes_atendidos || 0)} clientes con pedidos`,
            icon: <Users size={22} />,
            type: "positive"
        },
        {
            label: "Productos activos",
            value: Number(metrics.active_products || 0).toLocaleString("es-CL"),
            detail: `${Number(metrics.active_orders || 0)} pedidos activos`,
            icon: <Package size={22} />,
            type: "warning"
        }
    ];

    return (
        <section className="dashboard-page">
            <header className="dashboard-title">
                <h1>Dashboard</h1>
                <p>Overview de tu rendimiento comercial</p>
            </header>

            {loading ? (
                <p>Cargando dashboard...</p>
            ) : (
                <>
                    <div className="dashboard-kpi-grid">
                        {cards.map((card) => (
                            <article key={card.label} className="dashboard-kpi-card">
                                <div className="dashboard-kpi-top">
                                    <span>{card.label}</span>
                                    <div className="dashboard-kpi-icon">
                                        {card.icon}
                                    </div>
                                </div>

                                <strong>{card.value}</strong>

                                <small className={card.type}>
                                    <TrendingUp size={14} />
                                    {card.detail}
                                </small>
                            </article>
                        ))}
                    </div>

                    <div className="dashboard-main-grid">
                        <section className="dashboard-panel dashboard-revenue-panel">
                            <div className="dashboard-panel-title">
                                <h2>Revenue</h2>
                                <p>Ventas estimadas por día</p>
                            </div>

                            <div className="dashboard-line-chart">
                                {salesByDay.length === 0 ? (
                                    <div className="dashboard-empty">
                                        No hay ventas registradas.
                                    </div>
                                ) : (
                                    salesByDay.map((day) => {
                                        const height = Math.max(
                                            (Number(day.ventas) / maxSales) * 100,
                                            8
                                        );

                                        return (
                                            <div key={day.fecha} className="dashboard-line-point">
                                                <div className="dashboard-line-bar-wrapper">
                                                    <div
                                                        className="dashboard-line-bar"
                                                        style={{ height: `${height}%` }}
                                                    />
                                                </div>

                                                <span>
                                                    {new Date(day.fecha).toLocaleDateString("es-CL", {
                                                        day: "2-digit",
                                                        month: "2-digit"
                                                    })}
                                                </span>

                                                <strong>
                                                    ${Number(day.ventas).toLocaleString("es-CL")}
                                                </strong>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        <section className="dashboard-panel">
                            <div className="dashboard-panel-title">
                                <h2>Ventas por Categoría</h2>
                                <p>Distribución por categoría</p>
                            </div>

                            <div className="dashboard-category-list">
                                {salesByCategory.length === 0 ? (
                                    <div className="dashboard-empty">
                                        No hay categorías vendidas.
                                    </div>
                                ) : (
                                    salesByCategory.map((category) => {
                                        const width =
                                            (Number(category.total_vendido) / maxCategory) * 100;

                                        return (
                                            <div
                                                key={category.id_categoria || category.categoria}
                                                className="dashboard-category-row"
                                            >
                                                <span>{category.categoria || "Sin categoría"}</span>

                                                <div className="dashboard-category-bar">
                                                    <div style={{ width: `${width}%` }} />
                                                </div>

                                                <strong>
                                                    ${Number(category.total_vendido).toLocaleString("es-CL")}
                                                </strong>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </section>

                        <section className="dashboard-panel">
                            <div className="dashboard-panel-title">
                                <h2>Estado de Pedidos</h2>
                                <p>Estado actual de pedidos</p>
                            </div>

                            <div className="dashboard-status-visual">
                                <div className="dashboard-donut">
                                    <span>{totalStatus}</span>
                                    <small>Total</small>
                                </div>

                                <div className="dashboard-status-list">
                                    {ordersByStatus.map((status) => (
                                        <div
                                            key={status.id_estado}
                                            className="dashboard-status-row"
                                        >
                                            <span>{status.estado}</span>
                                            <strong>{status.total}</strong>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="dashboard-panel">
                            <div className="dashboard-panel-title">
                                <h2>Top items</h2>
                                <p>Productos más vendidos</p>
                            </div>

                            <div className="dashboard-top-products">
                                {topProducts.length === 0 ? (
                                    <div className="dashboard-empty">
                                        No hay productos vendidos.
                                    </div>
                                ) : (
                                    topProducts.slice(0, 5).map((product, index) => (
                                        <article
                                            key={product.id_producto}
                                            className="dashboard-top-product"
                                        >
                                            <div className="dashboard-product-rank">
                                                {index + 1}
                                            </div>

                                            <div>
                                                <strong>{product.nombre}</strong>
                                                <span>{product.categoria || "Sin categoría"}</span>
                                            </div>

                                            <small>{product.cantidad_vendida}</small>
                                        </article>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    <section className="dashboard-panel">
                        <div className="dashboard-panel-title horizontal">
                            <div>
                                <h2>Pedidos recientes</h2>
                                <p>Últimos pedidos registrados</p>
                            </div>

                            <ClipboardList size={22} />
                        </div>

                        <div className="dashboard-table-wrapper">
                            <table className="dashboard-orders-table">
                                <thead>
                                    <tr>
                                        <th>ID del Pedido</th>
                                        <th>Cliente</th>
                                        <th>Tipo</th>
                                        <th>Productos</th>
                                        <th>Total</th>
                                        <th>Estado</th>
                                        <th>Hora</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {recentOrders.map((order) => (
                                        <tr key={order.id_pedido}>
                                            <td>{formatOrderNumber(order.id_pedido)}</td>
                                            <td>{order.cliente_nombre || order.cliente_email}</td>
                                            <td>{getOrderType(order.id_tipo_pedido)}</td>
                                            <td>{order.total_items}</td>
                                            <td>
                                                ${Number(order.total).toLocaleString("es-CL")}
                                            </td>
                                            <td>
                                                <span className={`dashboard-order-status status-${order.id_estado}`}>
                                                    {order.estado}
                                                </span>
                                            </td>
                                            <td>
                                                {new Date(order.fecha_pedido).toLocaleTimeString("es-CL", {
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </>
            )}
        </section>
    );
}

export default Dashboard;