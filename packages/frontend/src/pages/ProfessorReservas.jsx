import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

const typeMap = {
  RESERVATION: "Reserva",
  LOAN: "Empréstimo",
  RETURN: "Devolução",
  EXCHANGE: "Troca por Defeito"
};

const statusMap = {
  OPEN: "Em Aberto",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado"
};

const pendencyMap = {
  OVERDUE_LOAN: "Atraso na Devolução",
  EXPIRED_RESERVATION: "Reserva Expirada"
};

export default function ProfessorReservas() {
  const { user } = useContext(AuthContext);
  const [ativosDisponiveis, setAtivosDisponiveis] = useState([]);
  const [minhasReservas, setMinhasReservas] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [pendencias, setPendencias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtro, setFiltro] = useState("");
  const [finalidade, setFinalidade] = useState("");
  const [reservaSucesso, setReservaSucesso] = useState(null);

  async function carregarDados() {
    if (!user) return;
    try {
      setLoading(true);
      const [resAtivos, resReservations, resMovs, resPendencies] = await Promise.all([
        api.get("/assets").catch(() => ({ data: [] })),
        api.get("/reservations/me").catch(() => ({ data: [] })),
        api.get("/movements/me").catch(() => ({ data: [] })),
        api.get("/movements/me/pending").catch(() => ({ data: [] }))
      ]);

      const ativos = resAtivos.data || [];
      const reservations = resReservations.data || [];
      const movs = resMovs.data || [];
      const pendingList = resPendencies.data || [];

      setAtivosDisponiveis(ativos.filter((a) => a.status === "AVAILABLE"));

      setMinhasReservas(reservations);
      setHistorico(movs);
      setPendencias(pendingList);
    } catch (error) {
      console.error("Erro ao carregar dados do professor:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarDados();
  }, [user]);

  async function reservarAtivo(item) {
    if (!finalidade) {
      alert("Por favor, informe a finalidade acadêmica da reserva");
      return;
    }

    try {
      const payload = {
        assetType: item.type,
        assetId: item.id,
        academicPurpose: finalidade
      };

      const response = await api.post("/reservations", payload);
      const data = response.data;
      const codigo = data.confirmationCode || "MOCK_CODE";

      setReservaSucesso(codigo);
      setFinalidade("");
      alert(`Reserva efetuada com sucesso! Código de Confirmação: ${codigo}`);
      carregarDados();
    } catch (error) {
      console.error("Erro ao efetuar reserva:", error);
      alert(error.response?.data?.message || "Erro ao efetuar reserva. Verifique suas pendências ou limites (RN02/RN05).");
    }
  }

  async function cancelarReserva(movId) {
    const confirmar = confirm("Deseja realmente cancelar esta reserva?");
    if (!confirmar) return;

    try {
      await api.delete(`/reservations/${movId}`);
      alert("Reserva cancelada com sucesso!");
      carregarDados();
    } catch (error) {
      console.error("Erro ao cancelar reserva:", error);
      alert(error.response?.data?.message || "Erro ao cancelar reserva");
    }
  }

  const ativosFiltrados = ativosDisponiveis.filter((item) => {
    const termo = filtro.toLowerCase();
    const typeLabel = item.type === "PROJECTOR" ? "projetor" : "chave";
    return (
      item.label?.toLowerCase().includes(termo) ||
      typeLabel.includes(termo)
    );
  });

  return (
    <div className="page" style={{ padding: "20px" }}>
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#0d3b66" }}>Área do Professor</h1>
        <p style={{ color: "#64748b" }}>Solicite reservas de chaves e projetores e consulte suas pendências.</p>
      </div>

      {reservaSucesso && (
        <div style={{
          backgroundColor: "#fef3c7",
          border: "2px dashed #d97706",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          textAlign: "center"
        }}>
          <h3 style={{ color: "#b45309", marginBottom: "5px" }}>Reserva Realizada!</h3>
          <p style={{ fontSize: "1rem", color: "#78350f" }}>Apresente o seguinte código de confirmação na secretaria para retirar o item:</p>
          <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#d97706", letterSpacing: "5px", margin: "15px 0" }}>
            {reservaSucesso}
          </div>
          <button
            onClick={() => setReservaSucesso(null)}
            style={{ padding: "8px 16px", backgroundColor: "#d97706", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Ok, entendi
          </button>
        </div>
      )}

      {/* PENDÊNCIAS ATIVAS */}
      {pendencias.length > 0 && (
        <div style={{
          backgroundColor: "#fee2e2",
          border: "1px solid #fca5a5",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "30px"
        }}>
          <h3 style={{ color: "#991b1b", marginBottom: "10px" }}>Bloqueio por Pendência Detectado (RN05)</h3>
          <ul style={{ color: "#7f1d1d", paddingLeft: "20px" }}>
            {pendencias.map((p, idx) => (
              <li key={idx} style={{ marginBottom: "5px" }}>
                <strong>{pendencyMap[p.type] || p.type}</strong>: {p.message} (Movimentação ID: {p.movementId})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* MINHAS RESERVAS ATIVAS */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#0d3b66", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px", marginBottom: "15px" }}>
          Minhas Reservas Ativas
        </h2>
        {minhasReservas.length === 0 ? (
          <p style={{ color: "#64748b" }}>Você não possui nenhuma reserva pendente de retirada.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {minhasReservas.map((item) => (
              <div key={item.id} style={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
                border: "1px solid #e2e8f0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}>
                <div>
                  <h3 style={{ color: "#0d3b66", marginBottom: "10px" }}>
                    {item.assetType === "PROJECTOR" ? `Projetor (ID: ${item.assetId})` : `Chave (ID: ${item.assetId})`}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "8px" }}>
                    Finalidade: {item.academicPurpose}
                  </p>
                  <div style={{
                    backgroundColor: "#f0fdf4",
                    padding: "10px",
                    borderRadius: "6px",
                    textAlign: "center",
                    border: "1px solid #bbf7d0",
                    margin: "15px 0"
                  }}>
                    <span style={{ fontSize: "0.8rem", color: "#166534", display: "block" }}>CÓDIGO DE CONFIRMAÇÃO</span>
                    <strong style={{ fontSize: "1.4rem", color: "#15803d", letterSpacing: "2px" }}>{item.confirmationCode}</strong>
                  </div>
                </div>
                <button
                  onClick={() => cancelarReserva(item.id)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "0.2s"
                  }}
                >
                  Cancelar Reserva
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* NOVA RESERVA */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ color: "#0d3b66", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px", marginBottom: "15px" }}>
          Solicitar Nova Reserva
        </h2>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Pesquisar ativos disponíveis (sala, bloco, marca, modelo...)"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minWidth: "250px"
            }}
          />
          <input
            type="text"
            placeholder="Finalidade Acadêmica (Ex: Aula de Computação)"
            value={finalidade}
            onChange={(e) => setFinalidade(e.target.value)}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              minWidth: "250px"
            }}
          />
        </div>

        {loading ? (
          <p>Carregando ativos...</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", textAlign: "left" }}>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Tipo</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Identificação / Detalhes</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {ativosFiltrados.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px" }}>
                    <strong style={{ color: item.type === "PROJECTOR" ? "#3b82f6" : "#10b981" }}>
                      {item.type === "PROJECTOR" ? "Projetor" : "Chave"}
                    </strong>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {item.label}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <button
                      onClick={() => reservarAtivo(item)}
                      style={{
                        backgroundColor: "#0d3b66",
                        color: "white",
                        border: "none",
                        padding: "8px 16px",
                        borderRadius: "6px",
                        cursor: "pointer"
                      }}
                    >
                      Reservar
                    </button>
                  </td>
                </tr>
              ))}
              {ativosFiltrados.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
                    Nenhum ativo disponível encontrado para reserva.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* HISTÓRICO */}
      <div>
        <h2 style={{ color: "#0d3b66", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px", marginBottom: "15px" }}>
          Histórico de Movimentações
        </h2>
        {historico.length === 0 ? (
          <p style={{ color: "#64748b" }}>Você não possui histórico de movimentação registrado.</p>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", textAlign: "left" }}>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Operação</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Ativo</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Finalidade</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Data Saída</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Data Devolução</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                  <td style={{ padding: "12px" }}>
                    <span className={`operacao-tag ${item.type?.toLowerCase() || ""}`}>
                      {typeMap[item.type] || item.type}
                    </span>
                  </td>
                  <td style={{ padding: "12px" }}>
                    {item.assetType === "PROJECTOR" ? `Projetor (ID: ${item.assetId})` : `Chave (ID: ${item.assetId})`}
                  </td>
                  <td style={{ padding: "12px" }}>{item.academicPurpose || "N/A"}</td>
                  <td style={{ padding: "12px" }}>{item.checkedOutAt ? new Date(item.checkedOutAt).toLocaleString() : new Date(item.createdAt).toLocaleString()}</td>
                  <td style={{ padding: "12px" }}>
                    {item.returnedAt ? new Date(item.returnedAt).toLocaleString() : (item.type === "LOAN" ? "Em Aberto" : "Finalizada")}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <span style={{ fontWeight: "bold" }}>
                      {statusMap[item.status] || item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
