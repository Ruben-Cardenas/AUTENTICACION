import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import {
  User,
  Mail,
  Lock,
  Camera,
  Plus,
  LayoutDashboard,
  ArrowLeftRight,
  Brain,
  Bell,
  LogOut
} from "lucide-react";

interface UserData {
  name: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData | null>(null);

  // 🔥 SUBPERFILES
  const [activeSubProfile, setActiveSubProfile] = useState<"perfil" | "transacciones">("perfil");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="profile-wrapper">

      {/* ===== SIDEBAR ===== */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SaveSmart</h2>
          <p>Tu futuro financiero</p>
        </div>

        <ul className="menu">
          <li><LayoutDashboard size={18} /> Dashboard</li>
          <li><ArrowLeftRight size={18} /> Transacciones</li>
          <li><Brain size={18} /> Análisis IA</li>
          <li className="active"><User size={18} /> Perfil</li>
          <li>
            <Bell size={18} />
            Notificaciones
            <span className="notif-badge">3</span>
          </li>

          <li onClick={handleLogout} className="logout-item" style={{ cursor: 'pointer', marginTop: 'auto', color: '#ff4d4d' }}>
            <LogOut size={18} /> Cerrar Sesión
          </li>
        </ul>
      </aside>

      {/* ===== CONTENIDO ===== */}
      <main className="profile-content">

        <h1 className="page-title">Perfil</h1>
        <p className="page-subtitle">
          Gestiona tu información personal y preferencias
        </p>

        {/* 🔥 BOTONES SUBPERFIL */}
        <div className="subprofile-switch">
          <button
            className={activeSubProfile === "perfil" ? "active" : ""}
            onClick={() => setActiveSubProfile("perfil")}
          >
            Datos del Perfil
          </button>

          <button
            className={activeSubProfile === "transacciones" ? "active" : ""}
            onClick={() => setActiveSubProfile("transacciones")}
          >
            Transacciones
          </button>
        </div>

        <div className="profile-grid">

          {/* 🔴 PERFIL */}
          {activeSubProfile === "perfil" && (
            <>
              {/* IZQUIERDA */}
              <div className="left-column">
                <div className="card user-card">
                  <div className="avatar-container">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff`}
                      alt="avatar"
                    />
                    <div className="camera-icon">
                      <Camera size={16} />
                    </div>
                  </div>

                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <span className="verified">Cuenta Verificada</span>
                </div>
              </div>

              {/* DERECHA */}
              <div className="right-column">
                <div className="card form-card">
                  <h3>Información Personal</h3>

                  <div className="form-group">
                    <label>Nombre Completo</label>
                    <div className="input-wrapper">
                      <User size={16} />
                      <input defaultValue={user.name} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Correo Electrónico</label>
                    <div className="input-wrapper">
                      <Mail size={16} />
                      <input defaultValue={user.email} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Cambiar Contraseña</label>
                    <div className="input-wrapper">
                      <Lock size={16} />
                      <input type="password" placeholder="Nueva contraseña" />
                    </div>
                  </div>

                  <button className="save-btn">
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </>
          )}

          {/* 🟢 TRANSACCIONES */}
          {activeSubProfile === "transacciones" && (
            <>
              {/* IZQUIERDA */}
              <div className="left-column">
                <div className="card stats-card">
                  <h3>Estadísticas Rápidas</h3>
                  <div className="stat-row">
                    <span>Días en SaveSmart</span>
                    <span className="highlight">1</span>
                  </div>
                  <div className="stat-row">
                    <span>Total Ahorrado</span>
                    <span className="money">$0.00</span>
                  </div>
                  <div className="stat-row">
                    <span>Metas Completadas</span>
                    <span className="highlight">0</span>
                  </div>
                </div>
              </div>

              {/* DERECHA */}
              <div className="right-column">
                <div className="card goals-card">
                  <div className="goals-header">
                    <h3>Metas Personales de Ahorro</h3>
                    <button className="new-goal">
                      <Plus size={14} /> Nueva Meta
                    </button>
                  </div>

                  <Goal
                    title="Fondo inicial"
                    amount="$0 / $1,000"
                    progress={0}
                    days="Recién comenzando"
                  />
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
};

type GoalProps = {
  title: string;
  amount: string;
  progress: number;
  days: string;
};

const Goal: React.FC<GoalProps> = ({ title, amount, progress, days }) => (
  <div className="goal-item">
    <div className="goal-top">
      <div>
        <h4>{title}</h4>
        <p>{amount}</p>
      </div>
      <span className="goal-percent">{progress}%</span>
    </div>

    <div className="progress-bar">
      <div
        className="progress-fill"
        style={{ width: `${progress}%` }}
      ></div>
    </div>

    <p className="goal-days">{days}</p>
  </div>
);

export default Profile;