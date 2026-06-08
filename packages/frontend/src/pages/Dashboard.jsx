import "../styles/dashboard.css";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    disponiveis: 0,
    reservados: 0,
    emprestados: 0,
    manutencao: 0,
    totalAtivos: 0,
    totalUsuarios: 0
  });

  const [profStats, setProfStats] = useState({
    reservasAtivas: 0,
    emprestimosAberto: 0,
    pendencias: 0
  });

  const [recentMovements, setRecentMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        if (user?.role === "PROFESSOR") {
          const [resMovs, resAtivos, resPendencies] = await Promise.all([
            api.get("/movements/me").catch(() => ({ data: [] })),
            api.get("/assets").catch(() => ({ data: [] })),
            api.get("/movements/me/pending").catch(() => ({ data: [] }))
          ]);

          const movs = resMovs.data || [];
          const ativos = resAtivos.data || [];
          const pendencies = resPendencies.data || [];

          const reservas = ativos.filter(
            a => a.status === "RESERVED" && a.reservedRegistrationNumber === user.matricula
          ).length;

          const emprestimos = movs.filter(
            m => m.type === "LOAN" && m.status === "OPEN"
          ).length;

          setProfStats({
            reservasAtivas: reservas,
            emprestimosAberto: emprestimos,
            pendencias: pendencies.length
          });

          const sorted = [...movs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentMovements(sorted.slice(0, 5));
        } else {
          const hoje = new Date();
          const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
          const amanha = new Date(hoje.getTime() + 24 * 60 * 60 * 1000);
          const formatarData = (d) => d.toISOString().split("T")[0];

          const [resAtivos, resUsuarios, resMovements] = await Promise.all([
            api.get("/assets").catch(() => ({ data: [] })),
            api.get("/users").catch(() => ({ data: [] })),
            api.get("/reports/movements", {
              params: {
                from: formatarData(trintaDiasAtras),
                to: formatarData(amanha),
                format: "json"
              }
            }).catch(() => ({ data: { movements: [] } }))
          ]);

          const ativos = resAtivos.data || [];
          const usuarios = resUsuarios.data || [];
          const movs = resMovements.data?.movements || [];

          const disponiveis = ativos.filter(a => a.status === "AVAILABLE").length;
          const reservados = ativos.filter(a => a.status === "RESERVED").length;
          const emprestados = ativos.filter(a => a.status === "ON_LOAN").length;
          const manutencao = ativos.filter(a => a.status === "MAINTENANCE").length;

          setStats({
            disponiveis,
            reservados,
            emprestados,
            manutencao,
            totalAtivos: ativos.length,
            totalUsuarios: usuarios.length
          });

          const sorted = [...movs].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setRecentMovements(sorted.slice(0, 5));
        }
      } catch (error) {
        console.error("Erro ao carregar dados do dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    if (user) {
      loadStats();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="dashboard" style={{ padding: "40px", textAlign: "center" }}>
        <h1>Carregando...</h1>
      </div>
    );
  }

  const isProf = user?.role === "PROFESSOR";

  return (
    <div className="dashboard">
      <h1>Dashboard - Olá, {user?.nome}</h1>
      <p style={{ color: "#64748b", margin: "10px 0 30px 0" }}>
        Você está logado como: <strong style={{ color: "#0d3b66" }}>{user?.role}</strong>
      </p>

      {isProf ? (
        <div className="dashboard-content">
          <div className="cards">
            <div className="card yellow">
              <h2>Reservas Ativas</h2>
              <span>{profStats.reservasAtivas}</span>
            </div>

            <div className="card blue">
              <h2>Empréstimos Ativos</h2>
              <span>{profStats.emprestimosAberto}</span>
            </div>

            <div className="card red">
              <h2>Pendências</h2>
              <span style={{ color: profStats.pendencias > 0 ? "#ef4444" : "#0d3b66" }}>
                {profStats.pendencias}
              </span>
            </div>
          </div>

          <div className="shortcuts-section" style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#0d3b66", marginBottom: "15px" }}>Ações Rápidas</h2>
            <div className="shortcut-buttons" style={{ display: "flex", gap: "15px" }}>
              <Link to="/reservar" className="btn-shortcut">
                Reservar Novo Ativo
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="dashboard-content">
          <div className="cards">
            <div className="card green">
              <h2>Disponíveis</h2>
              <span style={{ color: "#10b981" }}>{stats.disponiveis}</span>
            </div>

            <div className="card yellow">
              <h2>Reservados</h2>
              <span style={{ color: "#f59e0b" }}>{stats.reservados}</span>
            </div>

            <div className="card blue">
              <h2>Emprestados</h2>
              <span style={{ color: "#3b82f6" }}>{stats.emprestados}</span>
            </div>

            <div className="card red">
              <h2>Em Manutenção</h2>
              <span style={{ color: "#ef4444" }}>{stats.manutencao}</span>
            </div>
          </div>

          <div className="shortcuts-section" style={{ marginTop: "40px" }}>
            <h2 style={{ fontSize: "1.5rem", color: "#0d3b66", marginBottom: "15px" }}>Ações Rápidas</h2>
            <div className="shortcut-buttons" style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
              <Link to="/movimentacoes" className="btn-shortcut">
                Registrar Empréstimo / Devolução
              </Link>
              <Link to="/projetores" className="btn-shortcut">
                Gerenciar Projetores
              </Link>
              <Link to="/chaves" className="btn-shortcut">
                Gerenciar Chaves
              </Link>
              <Link to="/usuarios" className="btn-shortcut">
                Cadastrar Usuários
              </Link>
              <Link to="/manutencao" className="btn-shortcut">
                Manutenção de Ativos
              </Link>
              <Link to="/relatorios" className="btn-shortcut">
                Visualizar Relatórios
              </Link>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "40px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <h2 style={{ fontSize: "1.5rem", color: "#0d3b66", marginBottom: "15px" }}>Últimas 5 Movimentações</h2>
        {recentMovements.length === 0 ? (
          <p style={{ color: "#64748b" }}>Nenhuma movimentação recente encontrada.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Ativo</th>
                <th>Professor</th>
                <th>Local</th>
                <th>Data</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMovements.map((mov) => {
                const tipoTraduzido = {
                  RESERVATION: "Reserva",
                  LOAN: "Empréstimo",
                  RETURN: "Devolução",
                  EXCHANGE: "Troca por Defeito"
                }[mov.type] || mov.type;

                const statusTraduzido = {
                  OPEN: "Em Aberto",
                  COMPLETED: "Concluído",
                  CANCELLED: "Cancelado"
                }[mov.status] || mov.status;

                return (
                  <tr key={mov.id}>
                    <td><strong>{tipoTraduzido}</strong></td>
                    <td>{mov.assetType === "PROJECTOR" ? "Projetor" : "Chave"} (ID: {mov.assetId})</td>
                    <td>{mov.professorRegistrationNumber}</td>
                    <td>{mov.room || "-"}</td>
                    <td>{new Date(mov.createdAt).toLocaleString()}</td>
                    <td>
                      <span className={`status-tag ${mov.status?.toLowerCase()}`}>
                        {statusTraduzido}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}