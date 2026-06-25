import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AdminLayout() {
    return (
        <div className="app-layout">
            <Sidebar />

            <section className="main-shell">
                <Topbar />

                <main className="page-content">
                    <Outlet />
                </main>
            </section>
        </div>
    );
}

export default AdminLayout;