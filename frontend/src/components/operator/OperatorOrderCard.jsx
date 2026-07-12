import { getOrderType, formatOrderNumber } from "../../utils/orderHelpers";

function OperatorOrderCard({ order, onView }) {
    const items = order.items_text
        ? order.items_text.split("||")
        : [`${order.total_items} items`];

    function getTypeClass() {
        const type = getOrderType(order.id_tipo_pedido);

        if (type === "Delivery") return "delivery";
        if (type === "Pickup") return "pickup";

        return "in-person";
    }

    function getActionLabel() {
        if (order.id_estado === 1) return "Start Prep";
        if (order.id_estado === 2) return "Mark Ready";
        if (order.id_estado === 3) return "Mark Delivered";

        return null;
    }

    const actionLabel = getActionLabel();

    return (
        <article className="operator-order-card" onClick={() => onView(order.id_pedido)}>
            <header className="operator-order-card-header">
                <div>
                    <h3>{formatOrderNumber(order.id_pedido)}</h3>
                    <p>{order.cliente_nombre || order.cliente_email || "Cliente"}</p>
                </div>

                <span className={`operator-order-type ${getTypeClass()}`}>
                    {getOrderType(order.id_tipo_pedido)}
                </span>
            </header>

            <div className="operator-order-items">
                {items.slice(0, 3).map((item, index) => (
                    <p key={index}>{item}</p>
                ))}

                {items.length > 3 && (
                    <small>+{items.length - 3} more items</small>
                )}
            </div>

            <footer className="operator-order-footer">
                <strong>${Number(order.total).toLocaleString("es-CL")}</strong>

                {actionLabel && (
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                    >
                        {actionLabel}
                        <span>→</span>
                    </button>
                )}
            </footer>
        </article>
    );
}

export default OperatorOrderCard;