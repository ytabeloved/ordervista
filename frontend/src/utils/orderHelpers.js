export function getOrderStatus(idEstado) {
    const statuses = {
        1: { label: "Pending", className: "pending" },
        2: { label: "Preparing", className: "preparing" },
        3: { label: "Ready", className: "ready" },
        4: { label: "Delivered", className: "delivered" },
        5: { label: "Cancelled", className: "cancelled" }
    };

    return statuses[idEstado] || statuses[1];
}

export function getOrderType(idTipoPedido) {
    const types = {
        1: "Delivery",
        2: "Pickup",
        3: "In Person"
    };

    return types[idTipoPedido] || "Order";
}

export function formatOrderNumber(idPedido) {
    return `ord-${String(idPedido).padStart(3, "0")}`;
}

export function formatOrderDate(date) {
    return new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
}