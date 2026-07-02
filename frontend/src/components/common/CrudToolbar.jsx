import SearchInput from "./SearchInput";

// Barra reutilizable para búsqueda y filtros en pantallas CRUD
function CrudToolbar({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Search...",
    filters = [],
    activeFilter,
    onFilterChange
}) {
    return (
        <div className="crud-toolbar">
            <SearchInput
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={onSearchChange}
            />

            {filters.length > 0 && (
                <div className="crud-filters">
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            className={
                                activeFilter === filter.value
                                    ? "active"
                                    : ""
                            }
                            onClick={() => onFilterChange(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CrudToolbar;