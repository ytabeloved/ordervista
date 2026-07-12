import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "../pages/customer/Cart";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Login from "../pages/auth/Login";
import Categories from "../pages/admin/Categories";
import Products from "../pages/admin/Products";
import Menu from "../pages/customer/Menu";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Register from "../pages/auth/Register";
import Addresses from "../pages/customer/Addresses";
import Orders from "../pages/customer/Orders";
import OrderManagement from "../pages/operator/OrderManagement";
import CreateInPersonOrder from "../pages/operator/CreateInPersonOrder";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />


 {/*dentro  de  estas rutas se encuentra el layout de admin y las rutas protegidas para el dashboard, usuarios, categorias y productos*/}
                 <Route
                    path="/menu"
                    element={
                        <ProtectedRoute>
                            <Menu />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/addresses"
                    element={
                        <ProtectedRoute>
                            <Addresses />
                        </ProtectedRoute>
                    }
                />    

                <Route 
                    path="/orders" 
                    element={
                        <ProtectedRoute>
                            <Orders />
                        </ProtectedRoute>} />


                {/*route for order management for operators*/}
                
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
                    <Route path="/operator" element={<OrderManagement />} />
                    <Route path="/operator/new-order" element={<CreateInPersonOrder />} />
                  
                    
                    

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default AppRoutes;