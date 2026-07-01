import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Login from "../pages/auth/Login";

import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    element={
                        <ProtectedRoute>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route path="/" element={<Dashboard />} />
                    <Route path="/usuarios" element={<Users />} />
                    

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;