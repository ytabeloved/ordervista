import api from "../api/api";

// Envía las credenciales al backend y devuelve la respuesta del login
export async function login(email, password) {
    const response = await api.post("/auth/login", {
        email,
        password
    });

    return response.data;
}

// Elimina la sesión guardada en el navegador
export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
}

// Envía los datos del usuario al backend para registrarlo y devuelve la respuesta
export async function register(userData) {
    const response = await api.post("/auth/register", userData);
    return response.data;
}