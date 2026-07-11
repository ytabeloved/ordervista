import {
    Clock,
    CheckCircle2,
    XCircle,
    ChevronDown
} from "lucide-react";

import {
    getOrderStatus,
    getOrderType,
    formatOrderNumber,
    formatOrderDate
} from "../../utils/orderHelpers";

function OrderCard({ order, onView }) {
    const status = getOrderStatus(order.id_estado);

    function getIcon() {
        if (status.className === "cancelled") {
            return <XCircle size={22} />;
        }

        if (status.className === "delivered" || status.className === "ready") {
            return <CheckCircle2 size={22} />;
        }

        return <Clock size={22} />;
    }

    return (
        <article
            className="customer-order-card"
            onClick={() => onView(order.id_pedido)}
        >
            <div className={`customer-order-icon ${status.className}`}>
                {getIcon()}
            </div>

            <div className="customer-order-main">
                <div className="customer-order-title-row">
                    <h3>{formatOrderNumber(order.id_pedido)}</h3>

                    <span className={`customer-order-badge ${status.className}`}>
                        {status.label}
                    </span>

                    <span className="customer-order-type">
                        {getOrderType(order.id_tipo_pedido)}
                    </span>
                </div>

                <p>
                    {order.total_items} items · {formatOrderDate(order.fecha_pedido)}
                </p>
            </div>

            <div className="customer-order-total">
                <strong>${Number(order.total).toLocaleString("es-CL")}</strong>
                <ChevronDown size={18} />
            </div>
        </article>
    );
}

export default OrderCard;