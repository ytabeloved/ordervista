import {
    Clock,
    ChefHat,
    PackageCheck,
    CheckCircle2
} from "lucide-react";

import OperatorOrderCard from "./OperatorOrderCard";

function OperatorOrderColumn({ title, variant, orders, onView }) {
    function getIcon() {
        if (variant === "new") return <Clock size={20} />;
        if (variant === "preparing") return <ChefHat size={20} />;
        if (variant === "ready") return <PackageCheck size={20} />;

        return <CheckCircle2 size={20} />;
    }

    return (
        <section className="operator-order-column">
            <header className={`operator-column-header ${variant}`}>
                <div>
                    {getIcon()}
                    <h2>{title}</h2>
                </div>

                <span>{orders.length}</span>
            </header>

            <div className="operator-column-list">
                {orders.length === 0 ? (
                    <div className="operator-empty-column">
                        Sin pedidos
                    </div>
                ) : (
                    orders.map((order) => (
                        <OperatorOrderCard
                            key={order.id_pedido}
                            order={order}
                            onView={onView}
                        />
                    ))
                )}
            </div>
        </section>
    );
}

export default OperatorOrderColumn;