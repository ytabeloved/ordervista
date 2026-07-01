import api from "../api/api";

// Obtiene todos los usuarios
export async function getUsers() {

    const response = await api.get("/users");

    return response.data;

}

// Obtiene un usuario por id
export async function getUser(id) {

    const response = await api.get(`/users/${id}`);

    return response.data;

}

// Crea un usuario
export async function createUser(user) {

    const response = await api.post("/users", user);

    return response.data;

}

// Actualiza un usuario
export async function updateUser(id, user) {

    const response = await api.put(`/users/${id}`, user);

    return response.data;

}

// Elimina un usuario
export async function deleteUser(id) {

    const response = await api.delete(`/users/${id}`);

    return response.data;

}