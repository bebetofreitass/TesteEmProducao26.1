import "../styles/projetores.css";
import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

const statusMap = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  ON_LOAN: "Emprestado",
  MAINTENANCE: "Em Manutenção"
};

export default function Projetores() {
  const { user } = useContext(AuthContext);
  const [projetores, setProjetores] = useState([]);
  const [patrimonio, setPatrimonio] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [numeroSerie, setNumeroSerie] = useState("");
  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState(null);

  async function carregarProjetores() {
    try {
      setLoading(true);
      const response = await api.get("/projectors");
      setProjetores(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar projetores:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProjetores();
  }, []);

  function limparCampos() {
    setPatrimonio("");
    setMarca("");
    setModelo("");
    setNumeroSerie("");
  }

  async function salvarProjetor() {
    if (!patrimonio || !marca || !modelo || !numeroSerie) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const payload = {
      brand: marca,
      model: modelo,
      serialNumber: numeroSerie,
      assetTag: patrimonio
    };

    try {
      if (editandoId) {
        await api.put(`/projectors/${editandoId}`, payload);
        alert("Projetor atualizado com sucesso!");
      } else {
        await api.post("/projectors", payload);
        alert("Projetor cadastrado com sucesso!");
      }
      setEditandoId(null);
      limparCampos();
      carregarProjetores();
    } catch (error) {
      console.error("Erro ao salvar projetor:", error);
      alert(error.response?.data?.message || "Erro ao salvar projetor");
    }
  }

  function editarProjetor(item) {
    setPatrimonio(item.assetTag || "");
    setMarca(item.brand || "");
    setModelo(item.model || "");
    setNumeroSerie(item.serialNumber || "");
    setEditandoId(item.id);
  }

  async function excluirProjetor(id) {
    if (user?.role !== "ADMIN") {
      alert("Apenas administradores podem excluir ativos (RN07).");
      return;
    }

    const confirmar = confirm("Deseja realmente excluir este projetor?");
    if (!confirmar) return;

    try {
      await api.delete(`/projectors/${id}`);
      alert("Projetor excluído com sucesso!");
      carregarProjetores();
    } catch (error) {
      console.error("Erro ao excluir projetor:", error);
      alert(error.response?.data?.message || "Erro ao excluir projetor");
    }
  }

  function cancelarEdicao() {
    limparCampos();
    setEditandoId(null);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Projetores</h1>
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Patrimônio"
          value={patrimonio}
          onChange={(e) => setPatrimonio(e.target.value)}
        />
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Número de Série"
          value={numeroSerie}
          onChange={(e) => setNumeroSerie(e.target.value)}
        />

        <div className="buttons">
          <button onClick={salvarProjetor}>
            {editandoId ? "Salvar Alterações" : "Cadastrar"}
          </button>
          {editandoId && (
            <button className="cancel-btn" onClick={cancelarEdicao}>
              Cancelar
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <p>Carregando projetores...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Patrimônio</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Nº Série</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {projetores.map((item) => (
              <tr key={item.id}>
                <td>{item.assetTag}</td>
                <td>{item.brand}</td>
                <td>{item.model}</td>
                <td>{item.serialNumber}</td>
                <td>
                  <span className={`status-tag ${statusMap[item.status]?.toLowerCase().replace(" ", "-") || ""}`}>
                    {statusMap[item.status] || item.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => editarProjetor(item)}>
                    Editar
                  </button>
                  {user?.role === "ADMIN" && (
                    <button className="delete-btn" onClick={() => excluirProjetor(item.id)}>
                      Excluir
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {projetores.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Nenhum projetor cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}