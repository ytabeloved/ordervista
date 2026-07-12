import { formatOrderNumber } from "../../utils/orderHelpers";

function CommandListItem({ command, selected, onClick }) {
    function getStatusText() {
        if (command.id_estado === 1) return "Pending";
        if (command.id_estado === 2) return "Preparing";
        if (command.id_estado === 3) return "Ready";
        if (command.id_estado === 4) return "Delivered";
        if (command.id_estado === 5) return "Cancelled";

        return "Pending";
    }

    return (
        <article
            className={`command-list-item ${selected ? "selected" : ""}`}
            onClick={() => onClick(command.id_comanda)}
        >
            <div>
                <h3>{formatOrderNumber(command.id_pedido)}</h3>
                <p>{command.cliente_nombre || command.cliente_email || "Cliente"}</p>
                <span>{command.total_items} items</span>
            </div>

            <div className="command-list-status">
                <strong className={`command-status-badge status-${command.id_estado}`}>
                    {getStatusText()}
                </strong>
            </div>
        </article>
    );
}

export default CommandListItem;