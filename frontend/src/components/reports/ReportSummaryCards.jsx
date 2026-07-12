function ReportSummaryCards({ summary }) {
    const cards = [
        {
            label: "Ventas estimadas",
            value: `$${Number(summary?.ventas_estimadas || 0).toLocaleString("es-CL")}`
        },
        {
            label: "Pedidos",
            value: Number(summary?.total_pedidos || 0).toLocaleString("es-CL")
        },
        {
            label: "Ticket promedio",
            value: `$${Number(summary?.ticket_promedio || 0).toLocaleString("es-CL")}`
        },
        {
            label: "Clientes atendidos",
            value: Number(summary?.clientes_atendidos || 0).toLocaleString("es-CL")
        }
    ];

    return (
        <div className="report-summary-grid">
            {cards.map((card) => (
                <article key={card.label} className="report-summary-card">
                    <span>{card.label}</span>
                    <strong>{card.value}</strong>
                </article>
            ))}
        </div>
    );
}

export default ReportSummaryCards;