import api from "../api/api";

export async function getCommands() {
    const response = await api.get("/commands");
    return response.data;
}

export async function getCommandById(idComanda) {
    const response = await api.get(`/commands/${idComanda}`);
    return response.data;
}