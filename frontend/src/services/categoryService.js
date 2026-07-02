import api from "../api/api";

// Obtiene todas las categorías
export async function getCategories() {
    const response = await api.get("/categories");
    return response.data;
}

// Crea una nueva categoría
export async function createCategory(category) {
    const response = await api.post("/categories", category);
    return response.data;
}

// Actualiza una categoría existente
export async function updateCategory(id, category) {
    const response = await api.put(`/categories/${id}`, category);
    return response.data;
}

// Elimina una categoría
export async function deleteCategory(id) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
}