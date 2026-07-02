import PageHeader from "../../components/common/PageHeader";
import CrudToolbar from "../../components/common/CrudToolbar";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import CategoryTable from "../../components/categories/CategoryTable";
import CategoryForm from "../../components/categories/CategoryForm";

import useCrud from "../../hooks/useCrud";
import useSearchFilter from "../../hooks/useSearchFilter";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";

import "../../styles/categories.css";

const initialFormData = {
    nombre: "",
    descripcion: "",
    activo: true
};

function Categories() {
    const crud = useCrud({
        getAll: getCategories,
        createItem: createCategory,
        updateItem: updateCategory,
        deleteItem: deleteCategory,
        getId: (category) => category.id_categoria,
        initialFormData,
        mapItemToForm: (category) => ({
            nombre: category.nombre,
            descripcion: category.descripcion || "",
            activo: category.activa || category.activo ? true : false
        }),
        buildPayload: (formData) => ({
            ...formData,
            activo:
                formData.activo === true ||
                formData.activo === "true"
        }),
        errorMessages: {
            load: "No fue posible cargar las categorías.",
            save: "No fue posible guardar la categoría.",
            delete: "No fue posible eliminar la categoría."
        }
    });

    const search = useSearchFilter({
        items: crud.items,
        searchFields: ["nombre", "descripcion"],
        filterValue: "Todos",
        filterFunction: (category, filter) => {
            const isActive = category.activa || category.activo;

            return (
                filter === "Todos" ||
                (filter === "Activas" && isActive) ||
                (filter === "Inactivas" && !isActive)
            );
        }
    });

    return (
        <>
            <section className="categories-page">
                <PageHeader
                    title="Categories"
                    subtitle={`${crud.items.length} total categories`}
                    buttonText="Add Category"
                    onButtonClick={crud.openCreate}
                />

                <CrudToolbar
                    searchValue={search.search}
                    onSearchChange={search.setSearch}
                    searchPlaceholder="Search categories..."
                    filters={[
                        { label: "All", value: "Todos" },
                        { label: "Activas", value: "Activas" },
                        { label: "Inactivas", value: "Inactivas" }
                    ]}
                    activeFilter={search.activeFilter}
                    onFilterChange={search.setActiveFilter}
                />

                {crud.loading ? (
                    <p>Cargando categorías...</p>
                ) : (
                    <CategoryTable
                        categories={search.filteredItems}
                        onEdit={crud.openEdit}
                        onDelete={crud.openDelete}
                    />
                )}
            </section>

            {crud.showModal && (
                <Modal
                    title={
                        crud.editingItem
                            ? "Edit Category"
                            : "New Category"
                    }
                    onClose={crud.closeModal}
                >
                    <CategoryForm
                        formData={crud.formData}
                        setFormData={crud.setFormData}
                        onSubmit={crud.submit}
                        onCancel={crud.closeModal}
                        submitText={
                            crud.editingItem
                                ? "Save Changes"
                                : "Create Category"
                        }
                    />
                </Modal>
            )}

            <ConfirmDialog
                open={crud.showDeleteModal}
                title="Delete Category"
                message={`¿Seguro que deseas eliminar la categoría ${crud.itemToDelete?.nombre ?? ""}?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={crud.confirmDelete}
                onCancel={crud.closeDeleteModal}
            />
        </>
    );
}

export default Categories;