import api from "../api/api";

export async function getMenu() {
    const response = await api.get("/menu");
    return response.data;
}