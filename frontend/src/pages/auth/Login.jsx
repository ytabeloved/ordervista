import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import logo from "../../assets/logo.svg";
import "../../styles/login.css";
import demoUsers from "../../config/demoUsers";


function Login() {

    // Permite cambiar de página después del login
    const navigate = useNavigate();

    // Variables para guardar los datos del formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Guarda el mensaje de error si el login falla
    const [error, setError] = useState("");

    // Carga un usuario de prueba en el formulario
function loadDemoUser(role) {

        const user = demoUsers[role];

        if (user) {
            setEmail(user.email);
            setPassword(user.password);
        }

}

    // Se ejecuta al presionar el botón de iniciar sesión
    async function handleSubmit(e) {

        e.preventDefault();

        // Limpia cualquier error anterior
        setError("");

        try {

            // Envía las credenciales al backend
            const data = await login(email, password);

            console.log("Respuesta del backend:", data);

            // Guarda el token para las próximas solicitudes
            localStorage.setItem("token", data.token);

            // Guarda la información del usuario
            localStorage.setItem(
                "user",
                JSON.stringify(data.usuario)
            );

            // Redirige según el rol del usuario
            if (data.usuario.id_rol === 1) {

                navigate("/");

            } else if (data.usuario.id_rol === 2) {

                navigate("/operator");

            } else {

                navigate("/menu");

            }

        } catch (err) {

            // Muestra el mensaje recibido desde la API
            setError(
                err.response?.data?.mensaje ||
                "No fue posible iniciar sesión"
            );

        }

    }

    return (

        <main className="login-page">

            {/* Logo y nombre de la aplicación */}
            <section className="login-brand">

                <div className="login-logo">
                    <img src={logo} alt="OrderVista" />
                </div>

                <h1>OrderVista</h1>

                <p>aplicación de pedidos móviles</p>

            </section>

            {/* Formulario de inicio de sesión */}
            <form
                className="login-card"
                onSubmit={handleSubmit}
            >

                <h2>logueese en su cuenta</h2>

                <label>correo</label>

                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password</label>

                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Mensaje de error */}
                {error && (
                    <p className="login-error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Logueo
                </button>

                <div className="login-divider"></div>

                {/* Botones para pruebas durante el desarrollo */}
                <p className="login-demo-title">
                    CUENTAS DE PRUEBA-APRETE UN PERFIL
                </p>

                <div className="login-demo-buttons">

                    <button type="button" onClick={() => loadDemoUser("customer")}>
                        Customer
                    </button>

                    <button type="button" onClick={() => loadDemoUser("operator")}>
                        Operator
                    </button>

                    <button type="button" onClick={() => loadDemoUser("admin")}>
                        Admin
                    </button>

                </div>

                {/* Enlace para registrar un nuevo usuario */}
               <div className="login-divider"></div>

                    <p className="login-register">

                        No tienes una cuenta?

                    </p>

                    <Link
                        className="login-register-button"
                        to="/register"
                    >
                        Registrate
                    </Link>

            </form>

        </main>

    );

}

export default Login;