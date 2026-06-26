import { Navigate } from "react-router-dom";

// Verifica si el usuario tiene un token antes de ingresar
function ProtectedRoute({ children }) {

    // Obtiene el token guardado al iniciar sesión
    const token = localStorage.getItem("token");

    // Si no existe token, vuelve al login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Si existe token, permite acceder a la página
    return children;
}

export default ProtectedRoute;