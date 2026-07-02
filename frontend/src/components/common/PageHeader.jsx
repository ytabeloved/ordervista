import { Plus } from "lucide-react";

// Encabezado reutilizable para pantallas CRUD
function PageHeader({
    title,
    subtitle,
    buttonText,
    onButtonClick,
    buttonIcon
}) {
    return (
        <div className="page-header">
            <div className="page-header-info">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>

            {buttonText && (
                <button
                    className="btn-primary"
                    onClick={onButtonClick}
                >
                    {buttonIcon || <Plus size={18} />}
                    <span>{buttonText}</span>
                </button>
            )}
        </div>
    );
}

export default PageHeader;