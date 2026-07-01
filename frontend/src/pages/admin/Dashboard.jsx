import DashboardStats from "../../components/dashboard/DashboardStats";
import SalesChart from "../../components/dashboard/SalesChart";
import CategoriesChart from "../../components/dashboard/CategoriesChart";
import RecentOrders from "../../components/dashboard/RecentOrders";

import "../../styles/dashboard.css";

function Dashboard() {

    return (

        <>

            <DashboardStats />

            <div className="dashboard-charts">

                <SalesChart />

                <CategoriesChart />

            </div>

            <RecentOrders />

        </>

    );

}

export default Dashboard;