import api from "../api/api";

export async function getOrderTypes() {
    const response = await api.get("/order-types");
    return response.data;
}