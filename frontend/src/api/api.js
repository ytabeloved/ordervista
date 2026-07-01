import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api"
});

// Agrega el token a cada solicitud si existe sesión iniciada
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default api;