import api from "../api/api";

export async function createOrder(orderData) {
    const response = await api.post("/orders", orderData);
    return response.data;
}

export async function getOrders() {
    const response = await api.get("/orders");
    return response.data;
}

export async function getOrderDetail(idPedido) {
    const response = await api.get(`/orders/${idPedido}`);
    return response.data;
}