import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../sidebar/AdminSidebar";
import TopBar from "../topbar/Topbar";

import "../../styles/sidebar.css";
import "../../styles/topbar.css";

function AdminLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen] = useState(false);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 900) {
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className={`admin-layout ${collapsed ? "sidebar-collapsed" : ""}`}>
            <AdminSidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                mobileMenuOpen={mobileMenuOpen}
            />

            <div className="admin-main">
                <TopBar />

                <main className="admin-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;