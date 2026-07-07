function TableCard({
    items = [],
    children,
    emptyMessage = "No hay elementos para mostrar.",
}) {
    const isEmpty = items.length === 0;

    return (
        <div className="table-card">
            {!isEmpty ? (
                children
            ) : (
                <div className="table-empty">
                    <p>{emptyMessage}</p>
                </div>
            )}
        </div>
    );
}

export default TableCard;