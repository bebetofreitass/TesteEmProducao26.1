import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import "../styles/sidebar.css";

export default function Sidebar() {
  const { user } = useContext(AuthContext);

  const role = user?.role;

  return (
    <aside className="sidebar">

      <h2>GAC</h2>

      <nav>
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        {role === "PROFESSOR" && (
          <NavLink to="/reservar">
            Reservar Ativos
          </NavLink>
        )}

        {(role === "ADMIN" || role === "ATENDENTE") && (
          <>
            <NavLink to="/movimentacoes">
              Movimentações
            </NavLink>

            <NavLink to="/projetores">
              Projetores
            </NavLink>

            <NavLink to="/chaves">
              Chaves
            </NavLink>

            <NavLink to="/usuarios">
              Usuários
            </NavLink>

            <NavLink to="/relatorios">
              Relatórios
            </NavLink>

            <NavLink to="/manutencao">
              Manutenção
            </NavLink>
          </>
        )}

        <NavLink to="/alterar-senha">
          Alterar Senha
        </NavLink>
      </nav>

    </aside>
  );
}