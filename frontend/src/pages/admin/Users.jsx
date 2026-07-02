import PageHeader from "../../components/common/PageHeader";
import CrudToolbar from "../../components/common/CrudToolbar";
import Modal from "../../components/common/Modal";
import ConfirmDialog from "../../components/common/ConfirmDialog";

import UserTable from "../../components/users/UserTable";
import UserForm from "../../components/users/UserForm";

import useCrud from "../../hooks/useCrud";
import useSearchFilter from "../../hooks/useSearchFilter";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../services/userService";

import "../../styles/users.css";

const initialFormData = {
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    id_rol: 3,
    activo: true
};

function Users() {

    const crud = useCrud({

        getAll: getUsers,
        createItem: createUser,
        updateItem: updateUser,
        deleteItem: deleteUser,

        getId: (user) => user.id_usuario,

        initialFormData,

        mapItemToForm: (user) => ({

            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            password: "",
            telefono: user.telefono || "",

            id_rol:
                user.rol === "Administrador"
                    ? 1
                    : user.rol === "Operador"
                    ? 2
                    : 3,

            activo: user.activo ? true : false

        }),

        buildPayload: (formData) => ({

            ...formData,

            id_rol: Number(formData.id_rol),

            activo:
                formData.activo === true ||
                formData.activo === "true"

        }),

        errorMessages: {

            load: "No fue posible cargar los usuarios.",

            save: "No fue posible guardar el usuario.",

            delete: "No fue posible eliminar el usuario."

        }

    });

    const search = useSearchFilter({

        items: crud.items,

        searchFields: [
            "nombre",
            "apellido",
            "email"
        ],

        filterValue: "Todos",

        filterFunction: (user, filter) =>

            filter === "Todos" ||

            user.rol === filter

    });

    return (
        <>
            <section className="users-page">

                <PageHeader
                    title="Users"
                    subtitle={`${crud.items.length} total users`}
                    buttonText="Add User"
                    onButtonClick={crud.openCreate}
                />

                <CrudToolbar
                    searchValue={search.search}
                    onSearchChange={search.setSearch}
                    searchPlaceholder="Search users..."
                    filters={[
                        {
                            label: "All",
                            value: "Todos"
                        },
                        {
                            label: "Administrador",
                            value: "Administrador"
                        },
                        {
                            label: "Operador",
                            value: "Operador"
                        },
                        {
                            label: "Cliente",
                            value: "Cliente"
                        }
                    ]}
                    activeFilter={search.activeFilter}
                    onFilterChange={search.setActiveFilter}
                />

                {crud.loading ? (

                    <p>Cargando usuarios...</p>

                ) : (

                    <UserTable
                        users={search.filteredItems}
                        onEdit={crud.openEdit}
                        onDelete={crud.openDelete}
                    />

                )}

            </section>

            {crud.showModal && (

                <Modal
                    title={
                        crud.editingItem
                            ? "Edit User"
                            : "New User"
                    }
                    onClose={crud.closeModal}
                >

                    <UserForm
                        formData={crud.formData}
                        setFormData={crud.setFormData}
                        onSubmit={crud.submit}
                        onCancel={crud.closeModal}
                        submitText={
                            crud.editingItem
                                ? "Save Changes"
                                : "Create User"
                        }
                        mode={
                            crud.editingItem
                                ? "edit"
                                : "create"
                        }
                    />

                </Modal>

            )}

            <ConfirmDialog
                open={crud.showDeleteModal}
                title="Delete User"
                message={`¿Seguro que deseas eliminar a ${crud.itemToDelete?.nombre ?? ""} ${crud.itemToDelete?.apellido ?? ""}?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={crud.confirmDelete}
                onCancel={crud.closeDeleteModal}
            />

        </>
    );
}

export default Users;