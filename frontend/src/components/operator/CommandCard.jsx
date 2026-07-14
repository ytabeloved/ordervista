import { ChefHat, Clock, ReceiptText } from "lucide-react";
import { formatOrderNumber, getOrderType } from "../../utils/orderHelpers";

function CommandCard({ command, onView }) {
    const items = command.items_text
        ? command.items_text.split("||")
        : [`${command.total_items} productos`];

    function getStatusText() {
        if (command.id_estado === 1) return "Nuevo";
        if (command.id_estado === 2) return "Preparando";
        if (command.id_estado === 3) return "Listo";
        if (command.id_estado === 4) return "Entregado";
        if (command.id_estado === 5) return "Cancelado";

        return "New";
    }

    return (
        <article
            className="command-card"
            onClick={() => onView(command.id_comanda)}
        >
            <header className="command-card-header">
                <div className="command-card-icon">
                    <ChefHat size={22} />
                </div>

                <div>
                    <h3>Comanda #{command.id_comanda}</h3>
                    <p>{formatOrderNumber(command.id_pedido)}</p>
                </div>

                <span className="command-status">
                    {getStatusText()}
                </span>
            </header>

            <div className="command-card-meta">
                <span>
                    <ReceiptText size={16} />
                    {getOrderType(command.id_tipo_pedido)}
                </span>

                <span>
                    <Clock size={16} />
                    {new Date(command.fecha_generacion).toLocaleString("es-CL")}
                </span>
            </div>

            <div className="command-card-items">
                {items.slice(0, 4).map((item, index) => (
                    <p key={index}>{item}</p>
                ))}

                {items.length > 4 && (
                    <small>+{items.length - 4} productos más</small>
                )}
            </div>

            {command.observacion && (
                <p className="command-observation">
                    {command.observacion}
                </p>
            )}
        </article>
    );
}

export default CommandCard;