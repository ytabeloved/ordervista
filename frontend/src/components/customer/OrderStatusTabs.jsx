const tabs = [
    { key: "all", label: "All Orders" },
    { key: 1, label: "Pending" },
    { key: 2, label: "Preparing" },
    { key: 3, label: "Ready" },
    { key: 4, label: "Delivered" },
    { key: 5, label: "Cancelled" }
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