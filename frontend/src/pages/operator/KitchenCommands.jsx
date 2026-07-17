import { useEffect, useState } from "react";
import { RefreshCcw, Search } from "lucide-react";

import CommandListItem from "../../components/operator/CommandListItem";
import CommandTicketPreview from "../../components/operator/CommandTicketPreview";

import {
    getCommands,
    getCommandById
} from "../../services/commandService";

import { updateManagedOrderStatus } from "../../services/orderService";

import "../../styles/operator.css";

const filters = [
    { key: "all", label: "All" },
    { key: 1, label: "Pending" },
    { key: 2, label: "Preparing" },
    { key: 5, label: "Cancelled" }
];

function KitchenCommands() {
    const [commands, setCommands] = useState([]);
    const [selectedCommand, setSelectedCommand] = useState(null);
    const [selectedCommandId, setSelectedCommandId] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCommands();
    }, []);

    async function loadCommands() {
        setLoading(true);

        try {
            const data = await getCommands();
            setCommands(data);

            if (data.length > 0 && !selectedCommandId) {
                await loadCommandDetail(data[0].id_comanda);
            }
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar las comandas.");
        } finally {
            setLoading(false);
        }
    }

    async function loadCommandDetail(idComanda) {
        try {
            setSelectedCommandId(idComanda);

            const data = await getCommandById(idComanda);
            setSelectedCommand(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar el detalle de la comanda.");
        }
    }

    async function handleMoveToPreparing(idPedido) {
        try {
            await updateManagedOrderStatus(idPedido, 2);
            await loadCommands();

            if (selectedCommandId) {
                await loadCommandDetail(selectedCommandId);
            }
        } catch (error) {
            console.error(error.response?.data || error);
            alert(error.response?.data?.mensaje || "No fue posible actualizar la comanda.");
        }
    }

    function handlePrintTicket() {
        const ticket = document.getElementById("kitchen-ticket-print");

        if (!ticket) return;

        const printWindow = window.open("", "_blank");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Kitchen Ticket</title>
                    <style>
                        body {
                            font-family: monospace;
                            padding: 24px;
                        }

                        h1, h2 {
                            text-align: center;
                            letter-spacing: 6px;
                        }

                        h2 {
                            letter-spacing: 0;
                        }

                        hr {
                            border: none;
                            border-top: 1px dashed #999;
                            margin: 20px 0;
                        }

                        .ticket-row {
                            display: flex;
                            justify-content: space-between;
                            margin: 10px 0;
                        }

                        .ticket-item {
                            display: flex;
                            gap: 14px;
                            margin: 14px 0;
                            font-size: 18px;
                        }

                        .ticket-item span {
                            width: 36px;
                            height: 36px;
                            border-radius: 8px;
                            background: #2e7d32;
                            color: white;
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: 800;
                        }
                    </style>
                </head>

                <body>
                    ${ticket.innerHTML}
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }

    const filteredCommands = commands.filter((command) => {
        const term = search.toLowerCase();

        const matchesSearch =
            String(command.id_comanda).includes(term) ||
            String(command.id_pedido).includes(term) ||
            (command.cliente_nombre || "").toLowerCase().includes(term) ||
            (command.cliente_email || "").toLowerCase().includes(term) ||
            (command.items_text || "").toLowerCase().includes(term);

        const matchesStatus =
            selectedFilter === "all" ||
            command.id_estado === selectedFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <section className="kitchen-ticket-page">
            <header className="operator-orders-header">
                <div>
                    <h1>Tickets de la Cocina</h1>
                    <p>Selecciona un pedido para ver e imprimir su ticket de cocina</p>
                </div>

                <button type="button" onClick={loadCommands}>
                    <RefreshCcw size={22} />
                </button>
            </header>

            <div className="kitchen-filter-tabs">
                {filters.map((filter) => (
                    <button
                        key={filter.key}
                        type="button"
                        className={selectedFilter === filter.key ? "active" : ""}
                        onClick={() => setSelectedFilter(filter.key)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            <div className="kitchen-ticket-layout">
                <section className="kitchen-ticket-list-panel">
                    <div className="operator-search-box full">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {loading ? (
                        <p>Cargando comandas...</p>
                    ) : filteredCommands.length === 0 ? (
                        <div className="operator-empty-column">
                            No hay comandas para este filtro.
                        </div>
                    ) : (
                        <div className="kitchen-ticket-list">
                            {filteredCommands.map((command) => (
                                <CommandListItem
                                    key={command.id_comanda}
                                    command={command}
                                    selected={selectedCommandId === command.id_comanda}
                                    onClick={loadCommandDetail}
                                />
                            ))}
                        </div>
                    )}
                </section>

                <CommandTicketPreview
                    command={selectedCommand}
                    onPrint={handlePrintTicket}
                    onMoveToPreparing={handleMoveToPreparing}
                />
            </div>
        </section>
    );
}

export default KitchenCommands;