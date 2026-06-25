import StatCard from "../../components/ui/StatCard";

function Dashboard() {
    return (
        <>
            <section className="page-header">
                <h2>Panel Principal</h2>
                <p>Resumen del rendimiento de tu negocio</p>
            </section>

            <section className="stats-grid">
                <StatCard
                    title="Ingresos totales"
                    value="$323"
                    trend="+12.3% vs mes anterior"
                    icon="↗"
                />

                <StatCard
                    title="Pedidos hoy"
                    value="5"
                    trend="+5 desde ayer"
                    icon="▣"
                />

                <StatCard
                    title="Clientes totales"
                    value="5"
                    trend="2 nuevos esta semana"
                    icon="♙"
                />

                <StatCard
                    title="Productos activos"
                    value="18"
                    trend="3 sin stock"
                    icon="□"
                />
            </section>

            <section className="dashboard-grid">
                <div className="panel-card">
                    <h3>Ingresos — Junio 2026</h3>
                    <div className="placeholder-chart">
                        Gráfico de ingresos
                    </div>
                </div>

                <div className="panel-card">
                    <h3>Ventas por categoría</h3>
                    <div className="placeholder-chart">
                        Gráfico por categoría
                    </div>
                </div>
            </section>
        </>
    );
}

export default Dashboard;