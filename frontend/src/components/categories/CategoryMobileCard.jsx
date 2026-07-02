import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";

function CategoryMobileCard({ category, onEdit, onDelete }) {
    return (
        <article className="category-mobile-card">
            <div>
                <h3>{category.nombre}</h3>
                <p>{category.descripcion || "Sin descripción"}</p>
            </div>

            <div className="category-mobile-footer">
                <Badge type={category.activa || category.activo ? "active" : "inactive"}>
                    {category.activa || category.activo ? "Active" : "Inactive"}
                </Badge>

                <ActionButtons
                    onEdit={() => onEdit(category)}
                    onDelete={() => onDelete(category)}
                />
            </div>
        </article>
    );
}

export default CategoryMobileCard;