function DateFilter({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    onApply,
    onClear
}) {
    return (
        <div className="report-date-filter">
            <label>
                Desde
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </label>

            <label>
                Hasta
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </label>

            <button type="button" onClick={onApply}>
                Aplicar
            </button>

            <button type="button" className="secondary" onClick={onClear}>
                Limpiar
            </button>
        </div>
    );
}

export default DateFilter;