import { useState, useEffect } from "react";
import api from "../services/api";

export default function LiberarManutencao() {
  const [ativosManutencao, setAtivosManutencao] = useState([]);
  const [loading, setLoading] = useState(false);

  async function carregarAtivos() {
    try {
      setLoading(true);
      const response = await api.get("/assets", {
        params: { status: "MAINTENANCE" }
      });
      setAtivosManutencao(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar ativos em manutenção:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarAtivos();
  }, []);

  async function liberarAtivo(item) {
    const confirmar = confirm("Deseja liberar este ativo de volta para o status Disponível?");
    if (!confirmar) return;

    try {
      await api.patch(`/assets/${item.type}/${item.id}/release-maintenance`);
      alert("Ativo liberado com sucesso!");
      carregarAtivos();
    } catch (error) {
      console.error("Erro ao liberar ativo:", error);
      alert(error.response?.data?.message || "Erro ao liberar ativo da manutenção.");
    }
  }

  return (
    <div className="page" style={{ padding: "20px" }}>
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#0d3b66" }}>Manutenção de Ativos</h1>
        <p style={{ color: "#64748b" }}>Consulte e libere chaves e projetores após conserto ou manutenção técnica (UC15).</p>
      </div>

      {loading ? (
        <p>Carregando ativos em manutenção...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f8fafc", textAlign: "left" }}>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Tipo</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Identificação / Patrimônio</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Status</th>
              <th style={{ padding: "12px", borderBottom: "1px solid #e2e8f0" }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {ativosManutencao.map((item) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "12px" }}>
                  <strong style={{ color: "#ef4444" }}>{item.type === "PROJECTOR" ? "Projetor" : "Chave"}</strong>
                </td>
                <td style={{ padding: "12px" }}>
                  {item.label}
                </td>
                <td style={{ padding: "12px", color: "#64748b", fontStyle: "italic" }}>
                  Em Manutenção
                </td>
                <td style={{ padding: "12px" }}>
                  <button
                    onClick={() => liberarAtivo(item)}
                    style={{
                      backgroundColor: "#10b981",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "6px",
                      cursor: "pointer"
                    }}
                  >
                    Liberar / Disponibilizar
                  </button>
                </td>
              </tr>
            ))}
            {ativosManutencao.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "20px", color: "#64748b" }}>
                  Nenhum ativo em manutenção no momento.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
