import Modal from "../common/Modal";

import {
    getOrderStatus,
    getOrderType,
    formatOrderNumber,
    formatOrderDate
} from "../../utils/orderHelpers";

function OrderDetailModal({ order, loading, onClose }) {
    if (!order && !loading) return null;

    const status = order ? getOrderStatus(order.id_estado) : null;

    return (
        <Modal
            title={loading ? "Cargando pedido..." : `Order ${formatOrderNumber(order.id_pedido)}`}
            onClose={onClose}
        >
            {loading ? (
                <p>Cargando detalle...</p>
            ) : (
                <div className="order-detail">
                    <div className="order-detail-header">
                        <div>
                            <span className={`customer-order-badge ${status.className}`}>
                                {status.label}
                            </span>

                            <span className="customer-order-type">
                                {getOrderType(order.id_tipo_pedido)}
                            </span>
                        </div>

                        <p>{formatOrderDate(order.fecha_pedido)}</p>
                    </div>

                    {order.direccion && (
                        <div className="order-detail-section">
                            <h3>Delivery Address</h3>
                            <p>
                                {order.direccion}, {order.comuna}, {order.ciudad}
                            </p>
                        </div>
                    )}

                    {order.observacion && (
                        <div className="order-detail-section">
                            <h3>Observation</h3>
                            <p>{order.observacion}</p>
                        </div>
                    )}

                    <div className="order-detail-section">
                        <h3>Items</h3>

                        <div className="order-detail-items">
                            {order.items.map((item) => (
                                <article
                                    key={item.id_detalle}
                                    className="order-detail-item"
                                >
                                    <div>
                                        <strong>{item.nombre}</strong>
                                        <p>
                                            {item.cantidad} x $
                                            {Number(item.precio_unitario).toLocaleString("es-CL")}
                                        </p>
                                    </div>

                                    <strong>
                                        ${Number(item.subtotal).toLocaleString("es-CL")}
                                    </strong>
                                </article>
                            ))}
                        </div>
                    </div>

                    <div className="order-detail-total">
                        <span>Total</span>
                        <strong>${Number(order.total).toLocaleString("es-CL")}</strong>
                    </div>
                </div>
            )}
        </Modal>
    );
}

export default OrderDetailModal;