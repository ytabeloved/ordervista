import { useEffect, useState } from "react";

import { getUsers } from "../../services/userService";

import UserTable from "../../components/users/UserTable";

import "../../styles/users.css";

// Pantalla de administración de usuarios
function Users() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    async function loadUsers() {

        try {

            const data = await getUsers();

            console.log(data);

            setUsers(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadUsers();

    }, []);

    return (

        <section className="users-page">

            <div className="users-header">

                <div>

                    <h1>Usuarios</h1>

                    <p>Administración de usuarios del sistema</p>

                </div>

                <button className="btn-primary">

                    Nuevo Usuario

                </button>

            </div>

            {loading ? (

                <p>Cargando usuarios...</p>

            ) : (

                <UserTable users={users} />

            )}

        </section>

    );

}

export default Users;