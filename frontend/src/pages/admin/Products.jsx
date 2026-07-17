import PageHeader from "../../components/common/PageHeader";
import CrudToolbar from "../../components/common/CrudToolbar";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import ProductTable from "../../components/products/ProductTable";
import ProductForm from "../../components/products/ProductForm";

import useCrud from "../../hooks/useCrud";
import useSearchFilter from "../../hooks/useSearchFilter";

import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from "../../services/productService";

import { getCategories } from "../../services/categoryService";

import { useEffect, useState } from "react";

import "../../styles/products.css";

const initialFormData = {
    nombre: "",
    descripcion: "",
    id_categoria: "",
    precio: "",
    stock: 0,
    imagen: "",
    activo: true
};

function Products() {

    const [categories, setCategories] = useState([]);

    async function loadCategories() {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error(error);
        }
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
        useEffect(() => {
            loadCategories();
        }, []);

    const crud = useCrud({

        getAll: getProducts,

        createItem: createProduct,

        updateItem: updateProduct,

        deleteItem: deleteProduct,

        getId: (product) => product.id_producto,

        initialFormData,

        mapItemToForm: (product) => ({

            nombre: product.nombre,

            descripcion: product.descripcion || "",

            id_categoria: product.id_categoria,

            precio: product.precio,

            stock: product.stock,

            imagen: product.imagen || "",

            activo:
                product.activo === true ||
                product.activo === 1

        }),

        buildPayload: (formData) => ({

            ...formData,

            id_categoria: Number(formData.id_categoria),

            precio: Number(formData.precio),

            stock: Number(formData.stock),

            activo:
                formData.activo === true ||
                formData.activo === "true"

        }),

        errorMessages: {

            load: "No fue posible cargar los productos.",

            save: "No fue posible guardar el producto.",

            delete: "No fue posible eliminar el producto."

        }

    });

    const search = useSearchFilter({

        items: crud.items,

        searchFields: [
            "nombre",
            "descripcion",
            "categoria"
        ],

        filterValue: "Todos",

        filterFunction: (product, filter) => {

            const isActive =
                product.activo === true ||
                product.activo === 1;

            return (

                filter === "Todos" ||

                (filter === "Activos" && isActive) ||

                (filter === "Inactivos" && !isActive)

            );

        }

    });

    return (
        <>
            <section className="products-page">

                <PageHeader
                    title="Productos"
                    subtitle={`${crud.items.length} total productos`}
                    buttonText="Agregar Producto"
                    onButtonClick={crud.openCreate}
                />

                <CrudToolbar
                    searchValue={search.search}
                    onSearchChange={search.setSearch}
                    searchPlaceholder="Buscar productos..."
                    filters={[
                        {
                            label: "Todos",
                            value: "Todos"
                        },
                        {
                            label: "Activos",
                            value: "Activos"
                        },
                        {
                            label: "Inactivos",
                            value: "Inactivos"
                        }
                    ]}
                    activeFilter={search.activeFilter}
                    onFilterChange={search.setActiveFilter}
                />

                {crud.loading ? (

                    <p>Cargando productos...</p>

                ) : (

                    <ProductTable
                        products={search.filteredItems}
                        onEdit={crud.openEdit}
                        onDelete={crud.openDelete}
                    />

                )}

            </section>

            {crud.showModal && (

                <Modal
                    title={
                        crud.editingItem
                            ? "Editar Producto"
                            : "Nuevo Producto"
                    }
                    onClose={crud.closeModal}
                >

                    <ProductForm
                        formData={crud.formData}
                        setFormData={crud.setFormData}
                        categories={categories}
                        onSubmit={crud.submit}
                        onCancel={crud.closeModal}
                        submitText={
                            crud.editingItem
                                ? "guardar cambios"
                                : "Crear Producto"
                        }
                    />

                </Modal>

            )}

            <ConfirmDialog
                open={crud.showDeleteModal}
                title="Borrar Producto"
                message={`¿Seguro que deseas eliminar el producto ${crud.itemToDelete?.nombre ?? ""}?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={crud.confirmDelete}
                onCancel={crud.closeDeleteModal}
            />

        </>
    );
}

export default Products;