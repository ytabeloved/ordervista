import api from "../api/api";

// Obtener todos los productos
export async function getProducts() {
    const response = await api.get("/products");
    return response.data;
}

// Crear producto
export async function createProduct(product) {
    const response = await api.post("/products", product);
    return response.data;
}

// Actualizar producto
export async function updateProduct(id, product) {
    const response = await api.put(`/products/${id}`, product);
    return response.data;
}

// Eliminar producto
export async function deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
}