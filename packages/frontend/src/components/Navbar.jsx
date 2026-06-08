import "../styles/navbar.css";

import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

export default function Navbar() {

  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout() {

    logout();

    navigate("/");
  }

  return (
    <header className="navbar">

      <h1>
        GAC - Gestão de Ativos
      </h1>

      <div className="user-info" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {user && (
          <span className="user-details" style={{ fontSize: "0.9rem", color: "#64748b" }}>
            Olá, <strong>{user.nome}</strong> ({user.role})
          </span>
        )}
        <button onClick={handleLogout}>
          Sair
        </button>
      </div>

    </header>
  );
}