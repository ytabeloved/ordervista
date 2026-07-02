import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../sidebar/AdminSidebar";
import TopBar from "../topbar/TopBar";


function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

        // Colapsa el menú automáticamente en pantallas pequeñas
        useEffect(() => {
            function handleResize() {
            setCollapsed(window.innerWidth <= 900);
            }

            handleResize();

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
        };
        }, []);

    return (
        <div
            className={
                collapsed
                    ? "admin-layout sidebar-collapsed"
                    : "admin-layout"
            }
        >
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <main className="admin-main">
                <TopBar />
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;