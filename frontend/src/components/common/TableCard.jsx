function TableCard({
    items = [],
    children,
    emptyMessage = "No records found."
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