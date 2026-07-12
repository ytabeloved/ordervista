import { formatOrderNumber, getOrderType } from "../../utils/orderHelpers";

function ReceiptListItem({ order, selected, payment, onClick }) {
    return (
        <article
            className={`receipt-list-item ${selected ? "selected" : ""}`}
            onClick={() => onClick(order.id_pedido)}
        >
            <div>
                <h3>{formatOrderNumber(order.id_pedido)}</h3>
                <p>{order.cliente_nombre || order.cliente_email || "Cliente"}</p>
                <span>{getOrderType(order.id_tipo_pedido)}</span>
            </div>

            <div className="receipt-list-right">
                <strong>${Number(order.total).toLocaleString("es-CL")}</strong>

                <small className={payment ? "paid" : "pending-payment"}>
                    {payment ? "Pagado" : "Pendiente pago"}
                </small>
            </div>
        </article>
    );
}

export default ReceiptListItem;