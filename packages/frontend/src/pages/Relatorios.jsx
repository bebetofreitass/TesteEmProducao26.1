import "../styles/relatorios.css";
import { useState } from "react";
import api from "../services/api";

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

export default function Relatorios() {
  const [dataInicial, setDataInicial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [relatorios, setRelatorios] = useState([]);
  const [loading, setLoading] = useState(false);

  async function gerarRelatorio() {
    if (!dataInicial || !dataFinal) {
      alert("Selecione as datas");
      return;
    }

    try {
      setLoading(true);
      const response = await api.get("/reports/movements", {
        params: { from: dataInicial, to: dataFinal }
      });
      const movimentacoes = response.data.movements || [];
      setRelatorios(movimentacoes);
      if (movimentacoes.length === 0) {
        alert("Nenhum resultado encontrado para o período informado");
      }
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
      alert(error.response?.data?.message || "Erro ao conectar com o servidor para obter relatórios.");
    } finally {
      setLoading(false);
    }
  }

  function limparRelatorio() {
    setDataInicial("");
    setDataFinal("");
    setRelatorios([]);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Relatórios</h1>
      </div>

      <div className="relatorio-container">
        <div className="input-group">
          <label>Data Inicial</label>
          <input
            type="date"
            value={dataInicial}
            onChange={(e) => setDataInicial(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Data Final</label>
          <input
            type="date"
            value={dataFinal}
            onChange={(e) => setDataFinal(e.target.value)}
          />
        </div>
      </div>

      <div className="buttons">
        <button onClick={gerarRelatorio} disabled={loading}>
          {loading ? "Gerando..." : "Gerar Relatório"}
        </button>
        <button className="clear-btn" onClick={limparRelatorio}>
          Limpar
        </button>
      </div>

      {relatorios.length > 0 && (
        <div className="resultado-box">
          <div className="resultado-header">
            <h2>Resultados Encontrados: {relatorios.length}</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Operação</th>
                <th>Professor (Matrícula)</th>
                <th>Ativo</th>
                <th>Finalidade</th>
                <th>Saída</th>
                <th>Retorno</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {relatorios.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className={`operacao-tag ${item.type?.toLowerCase() || ""}`}>
                      {typeMap[item.type] || item.type}
                    </span>
                  </td>
                  <td>{item.professorRegistrationNumber}</td>
                  <td>
                    {item.assetType === "PROJECTOR" ? `Projetor (ID: ${item.assetId})` : `Chave (ID: ${item.assetId})`}
                  </td>
                  <td>{item.academicPurpose || "N/A"}</td>
                  <td>{item.checkedOutAt ? new Date(item.checkedOutAt).toLocaleString() : new Date(item.createdAt).toLocaleString()}</td>
                  <td>{item.returnedAt ? new Date(item.returnedAt).toLocaleString() : "Em aberto"}</td>
                  <td>
                    <span style={{ fontWeight: "bold" }}>
                      {statusMap[item.status] || item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}