import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, TrendingUp } from "lucide-react";
import api from "../services/api"; // IMPORTANTE: Asegúrate de tener este archivo
import "../styles/Login.css";

type LoginFormData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  // MODIFICAMOS ESTA FUNCIÓN PARA CONECTAR AL BACKEND
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Petición real al endpoint de Laravel
      const response = await api.post("/signin", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login exitoso:", response.data);
      
      // Opcional: Guardar datos del usuario en localStorage para persistencia
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirigir al perfil
      navigate("/perfil");

    } catch (error: any) {
      // Manejo de errores (ej. credenciales incorrectas)
      const errorMsg = error.response?.data?.message || "Error al iniciar sesión";
      alert("❌ " + errorMsg);
      console.error("Error detallado:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: keyof LoginFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="login-container">
      {/* ===== LADO IZQUIERDO ===== */}
      <div className="login-left">
        <div className="left-content">
          <div className="brand">
            <div className="logo-box">
              <TrendingUp size={26} />
            </div>
            <h1>SaveSmart</h1>
          </div>

          <h2 className="hero-title">
            Tu futuro financiero <br />
            <span className="gradient-text">
              comienza aquí
            </span>
          </h2>

          <p className="subtitle">
            Gestiona tus ahorros con inteligencia artificial y alcanza tus
            metas financieras más rápido.
          </p>
        </div>
      </div>

      {/* ===== LADO DERECHO ===== */}
      <div className="login-right">
        <div className="form-card">
          <h2>Bienvenido</h2>
          <p className="form-subtitle">
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input
                type="email"
                placeholder="Correo Electrónico"
                required
                value={formData.email}
                onChange={(e) =>
                  updateFormData("email", e.target.value)
                }
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                required
                value={formData.password}
                onChange={(e) =>
                  updateFormData("password", e.target.value)
                }
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            

            <button
              type="submit"
              className="submit-btn"
              disabled={isLoading}
            >
              {isLoading ? "Ingresando..." : "Iniciar Sesión"}
            </button>
          </form>

          <p className="register-text">
            ¿No tienes una cuenta?{" "}
            <Link to="/register">Regístrate gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;