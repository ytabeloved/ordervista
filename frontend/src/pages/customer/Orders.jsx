import { useEffect, useState } from "react";

import CustomerLayout from "../../components/customer/CustomerLayout";
import OrderStatusTabs from "../../components/customer/OrderStatusTabs";
import OrderCard from "../../components/customer/OrderCard";
import OrderDetailModal from "../../components/customer/OrderDetailModal";

import {
    getOrders,
    getOrderDetail
} from "../../services/orderService";

import "../../styles/customer.css";

function Orders() {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [loading, setLoading] = useState(true);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        loadOrders();
    }, []);

    async function loadOrders() {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar el historial de pedidos.");
        } finally {
            setLoading(false);
        }
    }

    async function openOrderDetail(idPedido) {
        setShowDetailModal(true);
        setDetailLoading(true);
        setSelectedOrder(null);

        try {
            const data = await getOrderDetail(idPedido);
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
        if (selectedStatus === "all") return true;
        return order.id_estado === selectedStatus;
    });

    return (
        <CustomerLayout>
            <section className="customer-orders-page">
                <header className="customer-orders-header">
                    <h1>Mis Pedidos</h1>
                    <p>Realiza un seguimiento de tu historial de pedidos y su estado actual</p>
                </header>

                <OrderStatusTabs
                    selectedStatus={selectedStatus}
                    onChange={setSelectedStatus}
                />

                {loading ? (
                    <p>Cargando pedidos...</p>
                ) : filteredOrders.length === 0 ? (
                    <div className="customer-empty-state">
                        <h3>No orders found</h3>
                        <p>Your orders will appear here once created.</p>
                    </div>
                ) : (
                    <div className="customer-orders-list">
                        {filteredOrders.map((order) => (
                            <OrderCard
                                key={order.id_pedido}
                                order={order}
                                onView={openOrderDetail}
                            />
                        ))}
                    </div>
                )}
            </section>

            {showDetailModal && (
                <OrderDetailModal
                    order={selectedOrder}
                    loading={detailLoading}
                    onClose={closeOrderDetail}
                />
            )}
        </CustomerLayout>
    );
}

export default Orders;