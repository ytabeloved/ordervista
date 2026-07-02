import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Login from "../pages/auth/Login";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";

import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Register from "../pages/auth/Register";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


 {/*dentro  de  estas rutas se encuentra el layout de admin y las rutas protegidas para el dashboard, usuarios, categorias y productos*/}
                <Route
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route path="/" element={<Dashboard />} />
                    <Route path="/usuarios" element={<Users />} />
                    <Route path="/categorias" element={<Categories />} />
                    <Route path="/productos" element={<Products />} />
                    
                    

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;