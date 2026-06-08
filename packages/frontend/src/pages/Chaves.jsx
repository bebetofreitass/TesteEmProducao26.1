import "../styles/chaves.css";
import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

const statusMap = {
  AVAILABLE: "Disponível",
  RESERVED: "Reservado",
  ON_LOAN: "Emprestado",
  MAINTENANCE: "Em Manutenção"
};

export default function Chaves() {
  const { user } = useContext(AuthContext);
  const [chaves, setChaves] = useState([]);
  const [sala, setSala] = useState("");
  const [bloco, setBloco] = useState("");
  const [patrimonio, setPatrimonio] = useState("");
  const [ehReserva, setEhReserva] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editandoId, setEditandoId] = useState(null);

  async function carregarChaves() {
    try {
      setLoading(true);
      const response = await api.get("/keys");
      setChaves(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar chaves:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarChaves();
  }, []);

  function limparCampos() {
    setSala("");
    setBloco("");
    setPatrimonio("");
    setEhReserva(false);
  }

  async function salvarChave() {
    if (!sala || !bloco) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    const payload = {
      room: sala,
      block: bloco,
      assetTag: patrimonio || null,
      spareKey: ehReserva
    };

    try {
      if (editandoId) {
        await api.put(`/keys/${editandoId}`, payload);
        alert("Chave atualizada com sucesso!");
      } else {
        await api.post("/keys", payload);
        alert("Chave cadastrada com sucesso!");
      }
      setEditandoId(null);
      limparCampos();
      carregarChaves();
    } catch (error) {
      console.error("Erro ao salvar chave:", error);
      alert(error.response?.data?.message || "Erro ao salvar chave");
    }
  }

  function editarChave(item) {
    setSala(item.room || "");
    setBloco(item.block || "");
    setPatrimonio(item.assetTag || "");
    setEhReserva(item.spareKey || false);
    setEditandoId(item.id);
  }

  async function excluirChave(id) {
    if (user?.role !== "ADMIN") {
      alert("Apenas administradores podem excluir chaves (RN07).");
      return;
    }

    const confirmar = confirm("Deseja realmente excluir esta chave?");
    if (!confirmar) return;

    try {
      await api.delete(`/keys/${id}`);
      alert("Chave excluída com sucesso!");
      carregarChaves();
    } catch (error) {
      console.error("Erro ao excluir chave:", error);
      alert(error.response?.data?.message || "Erro ao excluir chave");
    }
  }

  function cancelarEdicao() {
    limparCampos();
    setEditandoId(null);
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1>Chaves</h1>
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Sala"
          value={sala}
          onChange={(e) => setSala(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bloco"
          value={bloco}
          onChange={(e) => setBloco(e.target.value)}
        />
        <input
          type="text"
          placeholder="Patrimônio (Opcional)"
          value={patrimonio}
          onChange={(e) => setPatrimonio(e.target.value)}
        />

        <label style={{ display: "flex", alignItems: "center", gap: "10px", margin: "10px 0", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={ehReserva}
            onChange={(e) => setEhReserva(e.target.checked)}
          />
          Chave Reserva (spareKey)
        </label>

        <div className="buttons">
          <button onClick={salvarChave}>
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
        <p>Carregando chaves...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Sala</th>
              <th>Bloco</th>
              <th>Patrimônio</th>
              <th>Reserva?</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chaves.map((item) => (
              <tr key={item.id}>
                <td>{item.room}</td>
                <td>{item.block}</td>
                <td>{item.assetTag || "N/A"}</td>
                <td>{item.spareKey ? "Sim" : "Não"}</td>
                <td>
                  <span className={`status-tag ${statusMap[item.status]?.toLowerCase().replace(" ", "-") || ""}`}>
                    {statusMap[item.status] || item.status}
                  </span>
                </td>
                <td>
                  <button className="edit-btn" onClick={() => editarChave(item)}>
                    Editar
                  </button>
                  {user?.role === "ADMIN" && (
                    <button className="delete-btn" onClick={() => excluirChave(item.id)}>
                      Excluir
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {chaves.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Nenhuma chave cadastrada.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}