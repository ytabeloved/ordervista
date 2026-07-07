import { Search } from "lucide-react";

// Buscador reutilizable para listados
function SearchInput({ value, onChange, placeholder = "Buscar..." }) {
    return (
        <div className="search-input">
            <Search size={20} />

            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default SearchInput;