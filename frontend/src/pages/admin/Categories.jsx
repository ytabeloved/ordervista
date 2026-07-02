import { useEffect, useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import CrudToolbar from "../../components/common/CrudToolbar";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import CategoryTable from "../../components/categories/CategoryTable";
import CategoryForm from "../../components/categories/CategoryForm";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../../services/categoryService";

import "../../styles/categories.css";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("Todos");

    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        activo: true
    });

    async function loadCategories() {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar las categorías.");
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setFormData({
            nombre: "",
            descripcion: "",
            activo: true
        });
    }

    function closeCategoryModal() {
        setShowModal(false);
        setEditingCategory(null);
        resetForm();
    }

    function closeDeleteModal() {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const payload = {
                ...formData,
                activo:
                    formData.activo === true ||
                    formData.activo === "true"
            };

            if (editingCategory) {
                await updateCategory(editingCategory.id_categoria, payload);
            } else {
                await createCategory(payload);
            }

            await loadCategories();
            closeCategoryModal();

        } catch (error) {
            console.error(error);
            alert("No fue posible guardar la categoría.");
        }
    }

    function handleEdit(category) {
        setEditingCategory(category);

        setFormData({
            nombre: category.nombre,
            descripcion: category.descripcion || "",
            activo: category.activa || category.activo ? true : false
        });

        setShowModal(true);
    }

    function handleDelete(category) {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        try {
            await deleteCategory(categoryToDelete.id_categoria);
            await loadCategories();
            closeDeleteModal();

        } catch (error) {
            console.error(error);
            alert("No fue posible eliminar la categoría.");
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const filteredCategories = categories.filter((category) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
            category.nombre.toLowerCase().includes(searchText) ||
            (category.descripcion || "").toLowerCase().includes(searchText);

        const isActive = category.activa || category.activo;

        const matchesStatus =
            statusFilter === "Todos" ||
            (statusFilter === "Activas" && isActive) ||
            (statusFilter === "Inactivas" && !isActive);

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <section className="categories-page">
                <PageHeader
                    title="Categories"
                    subtitle={`${categories.length} total categories`}
                    buttonText="Add Category"
                    onButtonClick={() => {
                        setEditingCategory(null);
                        resetForm();
                        setShowModal(true);
                    }}
                />

                <CrudToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search categories..."
                    filters={[
                        { label: "All", value: "Todos" },
                        { label: "Activas", value: "Activas" },
                        { label: "Inactivas", value: "Inactivas" }
                    ]}
                    activeFilter={statusFilter}
                    onFilterChange={setStatusFilter}
                />

                {loading ? (
                    <p>Cargando categorías...</p>
                ) : (
                    <CategoryTable
                        categories={filteredCategories}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </section>

            {showModal && (
                <Modal
                    title={
                        editingCategory
                            ? "Edit Category"
                            : "New Category"
                    }
                    onClose={closeCategoryModal}
                >
                    <CategoryForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onCancel={closeCategoryModal}
                        submitText={
                            editingCategory
                                ? "Save Changes"
                                : "Create Category"
                        }
                    />
                </Modal>
            )}

            <ConfirmDialog
                open={showDeleteModal}
                title="Delete Category"
                message={`¿Seguro que deseas eliminar la categoría ${categoryToDelete?.nombre ?? ""}?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={closeDeleteModal}
            />
        </>
    );
}

export default Categories;