import api from "../api/api";

// Envía las credenciales al backend y devuelve la respuesta del login
export async function login(email, password) {
    const response = await api.post("/auth/login", {
        email,
        password
    });

    return response.data;
}