import { Printer, CheckCircle2 } from "lucide-react";

import {
    formatOrderNumber,
    getOrderType
} from "../../utils/orderHelpers";

function ReceiptPreview({
    order,
    payment,
    paymentMethod,
    setPaymentMethod,
    onRegisterPayment,
    onPrint
}) {
    if (!order) {
        return (
            <section className="receipt-preview-empty">
                Selecciona un pedido para generar el comprobante.
            </section>
        );
    }

    const isPaid = Boolean(payment);

    return (
        <section className="receipt-preview-wrapper">
            <div className="receipt-preview-header">
                <h2>Vista previa del comprobante</h2>

                <button
                    type="button"
                    onClick={onPrint}
                    disabled={!isPaid}
                >
                    <Printer size={18} />
                    Imprimir Comprobante
                </button>
            </div>

            <div id="receipt-print" className="receipt-ticket">
                <div className="receipt-logo">OV</div>

                <h1>ORDERVISTA</h1>
                <p>Comprobante operativo de pedido</p>

                <hr />

                <div className="receipt-row">
                    <span>Comprobante #</span>
                    <strong>{formatOrderNumber(order.id_pedido)}</strong>
                </div>

                <div className="receipt-row">
                    <span>Fecha</span>
                    <strong>
                        {new Date(order.fecha_pedido).toLocaleDateString("es-CL")}
                    </strong>
                </div>

                <div className="receipt-row">
                    <span>Cliente</span>
                    <strong>{order.cliente_nombre || order.cliente_email || "Cliente"}</strong>
                </div>

                <div className="receipt-row">
                    <span>Tipo de Pedido</span>
                    <strong>{getOrderType(order.id_tipo_pedido)}</strong>
                </div>

                <hr />

                <h3>ITEMS</h3>

                <div className="receipt-items">
                    {order.items.map((item) => (
                        <div key={item.id_detalle} className="receipt-item">
                            <span>
                                {item.cantidad}x {item.nombre}
                            </span>

                            <strong>
                                ${Number(item.subtotal).toLocaleString("es-CL")}
                            </strong>
                        </div>
                    ))}
                </div>

                <hr />

                <div className="receipt-total">
                    <span>TOTAL</span>
                    <strong>${Number(order.total).toLocaleString("es-CL")}</strong>
                </div>

                <hr />

                <div className="receipt-payment-box">
                    <h3>MÉTODO DE PAGO</h3>

                    {isPaid ? (
                        <>
                            <strong>{payment.metodo_pago}</strong>

                            <div className="receipt-payment-received">
                                <CheckCircle2 size={18} />
                                PAGO RECIBIDO
                            </div>

                            <small>
                                {new Date(payment.fecha_pago).toLocaleString("es-CL")}
                            </small>
                        </>
                    ) : (
                        <p>Pago pendiente de registro</p>
                    )}
                </div>
            </div>

            {!isPaid && (
                <div className="receipt-payment-actions">
                    <label>
                        Método de pago
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="EFECTIVO">Efectivo</option>
                            <option value="TARJETA">Tarjeta</option>
                        </select>
                    </label>

                    <button type="button" onClick={onRegisterPayment}>
                        <CheckCircle2 size={18} />
                        Registrar pago
                    </button>
                </div>
            )}
        </section>
    );
}

export default ReceiptPreview;