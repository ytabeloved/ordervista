import api from "../api/api";

export async function createOrder(orderData) {
    const response = await api.post("/orders", orderData);
    return response.data;
}