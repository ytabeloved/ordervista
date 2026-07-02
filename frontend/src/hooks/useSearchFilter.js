import { useMemo, useState } from "react";

// Hook reutilizable para búsqueda y filtros simples en listados
function useSearchFilter({
    items,
    searchFields = [],
    filterValue = "Todos",
    filterFunction
}) {
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState(filterValue);

    const filteredItems = useMemo(() => {
        const searchText = search.toLowerCase();

        return items.filter((item) => {
            const matchesSearch = searchFields.some((field) => {
                const value = item[field];

                return String(value || "")
                    .toLowerCase()
                    .includes(searchText);
            });

            const matchesFilter = filterFunction
                ? filterFunction(item, activeFilter)
                : true;

            return matchesSearch && matchesFilter;
        });
    }, [items, search, activeFilter, searchFields, filterFunction]);

    return {
        search,
        setSearch,
        activeFilter,
        setActiveFilter,
        filteredItems
    };
}

export default useSearchFilter;