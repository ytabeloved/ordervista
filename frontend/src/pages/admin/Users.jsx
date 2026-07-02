import { useEffect, useState } from "react";
import CrudToolbar from "../../components/common/CrudToolbar";
import PageHeader from "../../components/common/PageHeader";
import Modal from "../../components/common/Modal";
import UserForm from "../../components/users/UserForm";
import UserTable from "../../components/users/UserTable";

import {
    getUsers,
    createUser,
    updateUser,
    deleteUser
} from "../../services/userService";

import "../../styles/users.css";

import ConfirmDialog from "../../components/common/ConfirmDialog";


function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("Todos");

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        telefono: "",
        id_rol: 3,
        activo: true
    });

    async function loadUsers() {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error(error);
            alert("No fue posible cargar los usuarios.");
        } finally {
            setLoading(false);
        }
    }

    function resetForm() {
        setFormData({
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            telefono: "",
            id_rol: 3,
            activo: true
        });
    }

    function closeUserModal() {
        setShowModal(false);
        setEditingUser(null);
        resetForm();
    }

    function closeDeleteModal() {
        setShowDeleteModal(false);
        setUserToDelete(null);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const userPayload = {
                ...formData,
                id_rol: Number(formData.id_rol),
                activo:
                    formData.activo === true ||
                    formData.activo === "true"
            };

            if (editingUser) {
                await updateUser(editingUser.id_usuario, userPayload);
            } else {
                await createUser(userPayload);
            }

            await loadUsers();
            closeUserModal();

        } catch (error) {
            console.error(error);
            alert("No fue posible guardar el usuario.");
        }
    }

    function handleEdit(user) {
        setEditingUser(user);

        setFormData({
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
        });

        setShowModal(true);
    }

    function handleDelete(user) {
        setUserToDelete(user);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        try {
            await deleteUser(userToDelete.id_usuario);
            await loadUsers();
            closeDeleteModal();

        } catch (error) {
            console.error(error);
            alert("No fue posible eliminar el usuario.");
        }
    }

    useEffect(() => {
        loadUsers();
    }, []);

    const filteredUsers = users.filter((user) => {
        const fullName = `${user.nombre} ${user.apellido}`.toLowerCase();
        const email = user.email.toLowerCase();
        const searchText = search.toLowerCase();

        const matchesSearch =
            fullName.includes(searchText) ||
            email.includes(searchText);

        const matchesRole =
            roleFilter === "Todos" ||
            user.rol === roleFilter;

        return matchesSearch && matchesRole;
    });

    return (
        <>
            <section className="users-page">
                <PageHeader
                    title="Users"
                    subtitle={`${users.length} total users`}
                    buttonText="Add User"
                    onButtonClick={() => {
                        setEditingUser(null);
                        resetForm();
                        setShowModal(true);
                    }}
                />

                <CrudToolbar
                    searchValue={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Search users..."
                    filters={[
                        { label: "All", value: "Todos" },
                        { label: "Administrador", value: "Administrador" },
                        { label: "Operador", value: "Operador" },
                        { label: "Cliente", value: "Cliente" }
                    ]}
                    activeFilter={roleFilter}
                    onFilterChange={setRoleFilter}
                />               

                {loading ? (
                    <p>Cargando usuarios...</p>
                ) : (
                    <UserTable
                        users={filteredUsers}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                )}
            </section>

            {showModal && (
                <Modal
                    title={editingUser ? "Edit User" : "New User"}
                    onClose={closeUserModal}
                >
                    <UserForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        onCancel={closeUserModal}
                        submitText={editingUser ? "Save Changes" : "Create User"}
                        mode={editingUser ? "edit" : "create"}
                    />
                </Modal>
            )}

            <ConfirmDialog
                open={showDeleteModal}
                title="Delete User"
                message={`¿Seguro que deseas eliminar a ${userToDelete?.nombre ?? ""} ${userToDelete?.apellido ?? ""}?`}
                confirmText="Eliminar"
                cancelText="Cancelar"
                onConfirm={confirmDelete}
                onCancel={closeDeleteModal}
            />
        </>
    );
}

export default Users;