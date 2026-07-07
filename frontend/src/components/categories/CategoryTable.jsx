import Badge from "../common/Badge";
import ActionButtons from "../common/ActionButtons";
import CategoryMobileCard from "./CategoryMobileCard";

function CategoryTable({ categories, onEdit, onDelete }) {
    return (
        <>
            <div className="users-table-card">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>Categorias</th>
                            <th>Descripción</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id_categoria}>
                                <td>
                                    <strong>{category.nombre}</strong>
                                </td>

                                <td>
                                    {category.descripcion || "Sin descripción"}
                                </td>

                                <td>
                                    <Badge
                                        type={
                                            category.activa || category.activo
                                                ? "active"
                                                : "inactive"
                                        }
                                    >
                                        {category.activa || category.activo
                                            ? "Active"
                                            : "Inactive"}
                                    </Badge>
                                </td>

                                <td>
                                    <ActionButtons
                                        onEdit={() => onEdit(category)}
                                        onDelete={() => onDelete(category)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {categories.length === 0 && (
                    <p className="empty-table">
                        No se encontraron categorías.
                    </p>
                )}
            </div>

            <div className="categories-mobile-list">
                {categories.map((category) => (
                    <CategoryMobileCard
                        key={category.id_categoria}
                        category={category}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </>
    );
}

export default CategoryTable;