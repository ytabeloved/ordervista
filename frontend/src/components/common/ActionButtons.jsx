import { Pencil, Trash2 } from "lucide-react";

function ActionButtons({ onEdit, onDelete }) {
    return (
        <div className="action-buttons">
            <button
                className="icon-button"
                onClick={onEdit}
            >
                <Pencil size={18} />
            </button>

            <button
                className="icon-button delete"
                onClick={onDelete}
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}

export default ActionButtons;