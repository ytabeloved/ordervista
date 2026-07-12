import { Printer, Clock, ChefHat } from "lucide-react";

import {
    formatOrderNumber,
    getOrderType
} from "../../utils/orderHelpers";

function CommandTicketPreview({ command, onPrint, onMoveToPreparing }) {
    function getStatusText() {
        if (command.id_estado === 1) return "Pending";
        if (command.id_estado === 2) return "Preparing";
        if (command.id_estado === 3) return "Ready";
        if (command.id_estado === 4) return "Delivered";
        if (command.id_estado === 5) return "Cancelled";

        return "Pending";
    }

    if (!command) {
        return (
            <section className="ticket-preview-empty">
                Selecciona una comanda para ver el ticket.
            </section>
        );
    }

    return (
        <section className="ticket-preview-wrapper">
            <div className="ticket-preview-header">
                <h2>Ticket Preview</h2>

                <div className="ticket-preview-actions">
                    {command.id_estado === 1 && (
                        <button
                            type="button"
                            className="ticket-prep-button"
                            onClick={() => onMoveToPreparing(command.id_pedido)}
                        >
                            <ChefHat size={18} />
                            Start Prep
                        </button>
                    )}

                    <button type="button" onClick={onPrint}>
                        <Printer size={18} />
                        Print Ticket
                    </button>
                </div>
            </div>

            <div id="kitchen-ticket-print" className="kitchen-ticket">
                <h1>KITCHEN TICKET</h1>
                <h2>OrderVista</h2>

                <hr />

                <div className="ticket-row">
                    <span>Order #</span>
                    <strong>{formatOrderNumber(command.id_pedido)}</strong>
                </div>

                <div className="ticket-row">
                    <span>Customer</span>
                    <strong>{command.cliente_nombre || command.cliente_email || "Cliente"}</strong>
                </div>

                <div className="ticket-row">
                    <span>Type</span>
                    <strong>{getOrderType(command.id_tipo_pedido)}</strong>
                </div>

                <div className="ticket-row">
                    <span>Time</span>
                    <strong>
                        {new Date(command.fecha_generacion).toLocaleTimeString("es-CL", {
                            hour: "2-digit",
                            minute: "2-digit"
                        })}
                    </strong>
                </div>

                <div className="ticket-row">
                    <span>Status</span>
                    <strong className={`ticket-status status-${command.id_estado}`}>
                        {getStatusText()}
                    </strong>
                </div>

                <hr />

                <h3>ITEMS TO PREPARE</h3>

                <div className="ticket-items">
                    {command.items.map((item) => (
                        <div key={item.id_detalle} className="ticket-item">
                            <span>{item.cantidad}</span>
                            <strong>{item.nombre}</strong>
                        </div>
                    ))}
                </div>

                {command.observacion && (
                    <div className="ticket-note">
                        {command.observacion}
                    </div>
                )}

                <hr />

                <div className="ticket-footer">
                    <Clock size={16} />
                    <span>
                        {new Date(command.fecha_generacion).toLocaleString("es-CL")}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default CommandTicketPreview;