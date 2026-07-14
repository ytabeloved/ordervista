import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";

import { register } from "../../services/authService";
import logo from "../../assets/logo.svg";

import "../../styles/register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        try {
            setLoading(true);

            await register({
                nombre: formData.nombre,
                apellido: formData.apellido,
                email: formData.email,
                telefono: formData.telefono,
                password: formData.password
            });

            alert("Cuenta creada correctamente.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.mensaje || "No fue posible registrar la cuenta.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="register-page">
            <section className="register-brand">
                <div className="register-logo">
                    <img src={logo} alt="OrderVista" />
                </div>

                <h1>OrderVista</h1>
                <p>Cree su cuenta de cliente</p>
            </section>

            <form className="register-card" onSubmit={handleSubmit}>
                <h2>Crear cuenta</h2>

                <label>Nombre completo</label>
                <input
                    name="nombre"
                    placeholder="Maria"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

                <label>Apellido</label>
                <input
                    name="apellido"
                    placeholder="Silva"
                    value={formData.apellido}
                    onChange={handleChange}
                    required
                />

                <label>Direccion de Email</label>
                <input
                    type="email"
                    name="email"
                    placeholder="tucorreo@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label>Numero de telefono</label>
                <input
                    name="telefono"
                    placeholder="+56 9 000-00000"
                    value={formData.telefono}
                    onChange={handleChange}
                />

                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="minimo 6 caracteres"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                    required
                />

                <label>Confirmar password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Repita su password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    minLength={6}
                    required
                />

                <p className="register-terms">
                    Registrandose usted acepta nuestros Términos de Servicio y Política de Privacidad.
                </p>

                <button type="submit" disabled={loading}>
                    <UserPlus size={18} />
                    {loading ? "Creating..." : "Create Account"}
                </button>

                <p className="register-footer">
                    Ya tienes una cuenta?{" "}
                    <Link to="/login">Logueate</Link>
                </p>
            </form>
        </main>
    );
}

export default Register;