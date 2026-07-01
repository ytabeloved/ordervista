import { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";

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
                <div className="users-header">
                    <div>
                        <h1>Users</h1>
                        <p>{users.length} total users</p>
                    </div>

                    <button
                        className="btn-primary"
                        onClick={() => {
                            setEditingUser(null);
                            resetForm();
                            setShowModal(true);
                        }}
                    >
                        <Plus size={18} />
                        Add User
                    </button>
                </div>

                <div className="users-toolbar">
                    <div className="users-search">
                        <Search size={20} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="users-filters">
                        {["Todos", "Administrador", "Operador", "Cliente"].map((role) => (
                            <button
                                key={role}
                                className={roleFilter === role ? "active" : ""}
                                onClick={() => setRoleFilter(role)}
                            >
                                {role === "Todos" ? "All" : role}
                            </button>
                        ))}
                    </div>
                </div>

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

            {showDeleteModal && (
                <Modal
                    title="Delete User"
                    onClose={closeDeleteModal}
                >
                    <p>
                        ¿Seguro que deseas eliminar a{" "}
                        <strong>
                            {userToDelete?.nombre} {userToDelete?.apellido}
                        </strong>
                        ?
                    </p>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={closeDeleteModal}
                        >
                            Cancelar
                        </button>

                        <button
                            type="button"
                            className="btn-danger"
                            onClick={confirmDelete}
                        >
                            Eliminar
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Users;