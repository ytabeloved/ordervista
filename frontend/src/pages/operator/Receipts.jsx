import { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";

import ReceiptListItem from "../../components/operator/ReceiptListItem";
import ReceiptPreview from "../../components/operator/ReceiptPreview";

import {
    getManagedOrders,
    getManagedOrderDetail
} from "../../services/orderService";

import {
    getReceiptPayment,
    getReceiptPayments,
    saveReceiptPayment
} from "../../services/receiptLocalService";

import "../../styles/operator.css";

function Receipts() {
    const [orders, setOrders] = useState([]);
    const [payments, setPayments] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState("EFECTIVO");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadOrders();
        setPayments(getReceiptPayments());
    }, []);

    async function loadOrders() {
        setLoading(true);

        try {
            const data = await getManagedOrders();

            const validOrders = data.filter(
                (order) => order.id_estado === 3 || order.id_estado === 4
            );

            setOrders(validOrders);

            if (validOrders.length > 0) {
                await loadOrderDetail(validOrders[0].id_pedido);
            }
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar los pedidos para comprobante.");
        } finally {
            setLoading(false);
        }
    }

    async function loadOrderDetail(idPedido) {
        try {
            setSelectedOrderId(idPedido);

            const data = await getManagedOrderDetail(idPedido);
            setSelectedOrder(data);

            const payment = getReceiptPayment(idPedido);

            if (payment) {
                setPaymentMethod(payment.metodo_pago);
            } else {
                setPaymentMethod("EFECTIVO");
            }
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar el detalle del pedido.");
        }
    }

    function handleRegisterPayment() {
        if (!selectedOrder) return;

        const payment = saveReceiptPayment(
            selectedOrder.id_pedido,
            paymentMethod
        );

        setPayments(getReceiptPayments());

        alert(`Pago registrado correctamente: ${payment.metodo_pago}`);
    }

    function handlePrintReceipt() {
        const receipt = document.getElementById("receipt-print");

        if (!receipt) return;

        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Receipt</title>
                    <style>
                        body {
                            font-family: monospace;
                            padding: 24px;
                        }

                        h1, h3, p {
                            text-align: center;
                        }

                        hr {
                            border: none;
                            border-top: 1px dashed #999;
                            margin: 20px 0;
                        }

                        .receipt-row,
                        .receipt-item,
                        .receipt-total {
                            display: flex;
                            justify-content: space-between;
                            margin: 10px 0;
                        }

                        .receipt-total {
                            font-size: 20px;
                            font-weight: 800;
                        }

                        .receipt-payment-received {
                            margin-top: 14px;
                            padding: 10px;
                            border-radius: 8px;
                            background: #e8f5e9;
                            color: #2e7d32;
                            font-weight: 800;
                            text-align: center;
                        }
                    </style>
                </head>

                <body>
                    ${receipt.innerHTML}
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }

    const filteredOrders = orders.filter((order) => {
        const term = search.toLowerCase();

        return (
            String(order.id_pedido).includes(term) ||
            (order.cliente_nombre || "").toLowerCase().includes(term) ||
            (order.cliente_email || "").toLowerCase().includes(term) ||
            (order.items_text || "").toLowerCase().includes(term)
        );
    });

    const selectedPayment = selectedOrder
        ? payments[selectedOrder.id_pedido]
        : null;

    return (
        <section className="receipts-page">
            <header className="operator-orders-header">
                <div>
                    <h1>Receipts</h1>
                    <p>Registra pagos operativos y genera comprobantes imprimibles.</p>
                </div>

                <button type="button" onClick={loadOrders}>
                    <RefreshCcw size={22} />
                </button>
            </header>

            <div className="receipts-layout">
                <section className="receipt-list-panel">
                    <div className="operator-search-box full">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Buscar pedidos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <p>Cargando pedidos...</p>
                    ) : filteredOrders.length === 0 ? (
                        <div className="operator-empty-column">
                            No hay pedidos listos para comprobante.
                        </div>
                    ) : (
                        <div className="receipt-list">
                            {filteredOrders.map((order) => (
                                <ReceiptListItem
                                    key={order.id_pedido}
                                    order={order}
                                    selected={selectedOrderId === order.id_pedido}
                                    payment={payments[order.id_pedido]}
                                    onClick={loadOrderDetail}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <ReceiptPreview
                    order={selectedOrder}
                    payment={selectedPayment}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    onRegisterPayment={handleRegisterPayment}
                    onPrint={handlePrintReceipt}
                />
            </div>
        </section>
    );
}

export default Receipts;