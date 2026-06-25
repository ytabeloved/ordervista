import { useState } from "react";
import { login } from "../../services/authService";
import "../../styles/login.css";
import logo from "../../assets/logo.svg";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {

    const data = await login(email, password);

    console.log("Respuesta del backend:", data);

    localStorage.setItem("token", data.token);
    localStorage.setItem(
        "user",
        JSON.stringify(data.usuario)
    );

    if (data.usuario.id_rol === 1) {
    navigate("/");
    } else if (data.usuario.id_rol === 2) {
    navigate("/operator");  
    } else {
    navigate("/menu");
    }

} catch (err) {

    setError(
        err.response?.data?.mensaje ||
        "No fue posible iniciar sesión"
    );

}
    }

    return (
        <main className="login-page">
            <section className="login-brand">
                <div className="login-logo">
                    <img src={logo} alt="OrderVista" />
                </div>
                <h1>OrderVista</h1>
                <p>aplicación de pedidos móviles</p>
            </section>

            <form className="login-card" onSubmit={handleSubmit}>
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

                {error && <p className="login-error">{error}</p>}

                <button type="submit">
                    Logueo
                </button>

                <div className="login-divider"></div>

                <p className="login-demo-title">
                    CUENTAS DE PRUEBA-APRETE UN PERFIL
                </p>

                <div className="login-demo-buttons">
                    <button type="button">Customer</button>
                    <button type="button">Operator</button>
                    <button type="button">Admin</button>
                </div>

                <p className="login-register">
                    Don't have an account? <span>Create one</span>
                </p>
            </form>
        </main>
    );
}

export default Login;