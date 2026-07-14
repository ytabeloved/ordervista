import { getOrderType, formatOrderNumber } from "../../utils/orderHelpers";

function OperatorOrderCard({ order, onView, onUpdateStatus }) {
    const items = order.items_text
        ? order.items_text.split("||")
        : [`${order.total_items} items`];

    function getTypeClass() {
        const type = getOrderType(order.id_tipo_pedido);

        if (type === "Delivery") return "delivery";
        if (type === "Pickup") return "pickup";

        return "in-person";
    }

    function getNextStatus() {
        if (order.id_estado === 1) {
            return {
                id_estado: 2,
                label: "Comenzar Preparación"
            };
        }

        if (order.id_estado === 2) {
            return {
                id_estado: 3,
                label: "Marcar como Listo"
            };
        }

        if (order.id_estado === 3) {
            return {
                id_estado: 4,
                label: "Marcar como Entregado"
            };
        }

        return null;
    }

    const nextStatus = getNextStatus();

    return (
        <article
            className="operator-order-card"
            onClick={() => onView(order.id_pedido)}
        >
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

                <div className="operator-order-actions">
                    {order.id_estado !== 4 && order.id_estado !== 5 && (
                        <button
                            type="button"
                            className="operator-cancel-button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(order.id_pedido, 5);
                            }}
                        >
                            Cancel
                        </button>
                    )}

                    {nextStatus && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(
                                    order.id_pedido,
                                    nextStatus.id_estado
                                );
                            }}
                        >
                            {nextStatus.label}
                            <span>→</span>
                        </button>
                    )}
                </div>
            </footer>
        </article>
    );
}

export default OperatorOrderCard;