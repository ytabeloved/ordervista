const tabs = [
    { key: "Todos", label: "Todos los pedidos" },
    { key: 1, label: "Pendiente" },
    { key: 2, label: "Preparando" },
    { key: 3, label: "Listo" },
    { key: 4, label: "Entregado" },
    { key: 5, label: "Cancelado" }
];

function OrderStatusTabs({ selectedStatus, onChange }) {
    return (
        <div className="order-status-tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    type="button"
                    className={selectedStatus === tab.key ? "active" : ""}
                    onClick={() => onChange(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default OrderStatusTabs;