import { dashboardStats } from "../../data/dashboardData";
import {
    ShoppingCart,
    DollarSign,
    Package,
    Users
} from "lucide-react";

import StatCard from "./StatCard";

// Tarjetas principales del Dashboard
function DashboardStats() {

    return (

        <section className="dashboard-stats">

            <StatCard
                title={dashboardStats[0].title}
                value={dashboardStats[0].value}
                icon={<ShoppingCart size={28} />}
            />

            <StatCard
                title={dashboardStats[1].title}
                value={dashboardStats[1].value}
                icon={<DollarSign size={28} />}
            />

            <StatCard
                title={dashboardStats[2].title}
                value={dashboardStats[2].value}
                icon={<Package size={28} />}
            />

            <StatCard
                title={dashboardStats[3].title}
                value={dashboardStats[3].value}
                icon={<Users size={28} />}
            />

        </section>

    );

}

export default DashboardStats;