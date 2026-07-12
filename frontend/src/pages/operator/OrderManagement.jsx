import { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";

import OperatorOrderColumn from "../../components/operator/OperatorOrderColumn";
import OrderDetailModal from "../../components/customer/OrderDetailModal";

import {
    getManagedOrders,
    getManagedOrderDetail,
    updateManagedOrderStatus
} from "../../services/orderService";

import "../../styles/customer.css";
import "../../styles/operator.css";

const columns = [
    { id_estado: 1, title: "New Orders", variant: "new" },
    { id_estado: 2, title: "Preparing", variant: "preparing" },
    { id_estado: 3, title: "Ready", variant: "ready" },
    { id_estado: 4, title: "Delivered", variant: "delivered" }
];

function OrderManagement() {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    async function handleUpdateStatus(idPedido, idEstado) {
        try {
            await updateManagedOrderStatus(idPedido, idEstado);
            await loadOrders();
        } catch (error) {
            console.error(error);
            alert("No fue posible actualizar el estado del pedido.");
        }
    }
    
    async function loadOrders() {
        setLoading(true);

        try {
            const data = await getManagedOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar la gestión de pedidos.");
        } finally {
            setLoading(false);
        }
    }

    async function openOrderDetail(idPedido) {
        setShowDetailModal(true);
        setDetailLoading(true);
        setSelectedOrder(null);

        try {
            const data = await getManagedOrderDetail(idPedido);
            setSelectedOrder(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar el detalle del pedido.");
            setShowDetailModal(false);
        } finally {
            setDetailLoading(false);
        }
    }

    function closeOrderDetail() {
        setShowDetailModal(false);
        setSelectedOrder(null);
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

    const activeOrders = orders.filter(
        (order) => order.id_estado !== 4 && order.id_estado !== 5
    ).length;

    return (
        <section className="operator-orders-page">
            <header className="operator-orders-header">
                <div>
                    <h1>Gestión de Pedidos</h1>
                    <p>{activeOrders} pedidos activos</p>
                </div>

                <div className="operator-orders-actions">
                    <div className="operator-search-box">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Buscar pedidos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <button type="button" onClick={loadOrders}>
                        <RefreshCcw size={22} />
                    </button>
                </div>
            </header>

            {loading ? (
                <p>Cargando pedidos...</p>
            ) : (
                <div className="operator-orders-board">
                    {columns.map((column) => (
                        <OperatorOrderColumn
                            key={column.id_estado}
                            title={column.title}
                            variant={column.variant}
                            orders={filteredOrders.filter(
                                (order) => order.id_estado === column.id_estado
                            )}
                            onView={openOrderDetail}
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ))}
                </div>
            )}

            {showDetailModal && (
                <OrderDetailModal
                    order={selectedOrder}
                    loading={detailLoading}
                    onClose={closeOrderDetail}
                />
            )}
        </section>
    );
}

export default OrderManagement;