import "../styles/usuarios.css";
import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function Usuarios() {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("");
  const [senhaInicial, setSenhaInicial] = useState("");

  const [editandoId, setEditandoId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === "ATENDENTE") {
      setPerfil("PROFESSOR");
    } else {
      setPerfil("");
    }
  }, [user]);

  async function carregarUsuarios() {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsuarios(response.data || []);
    } catch (error) {
      console.error("Erro ao carregar usuários:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  function limparCampos() {
    setNome("");
    setMatricula("");
    setEmail("");
    setPerfil(user?.role === "ATENDENTE" ? "PROFESSOR" : "");
    setSenhaInicial("");
  }

  async function salvarUsuario() {
    if (!nome || !matricula || !perfil || (!editandoId && !senhaInicial)) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editandoId) {
        const payload = {
          name: nome,
          email,
          role: perfil === "ATENDENTE" ? "ATTENDANT" : perfil
        };
        await api.put(`/users/${editandoId}`, payload);
        alert("Usuário atualizado com sucesso!");
      } else {
        if (perfil === "PROFESSOR") {
          const payload = {
            name: nome,
            email,
            registrationNumber: matricula,
            password: senhaInicial
          };
          await api.post("/professors", payload);
        } else {
          const payload = {
            name: nome,
            email,
            registrationNumber: matricula,
            password: senhaInicial,
            role: perfil === "ATENDENTE" ? "ATTENDANT" : perfil
          };
          await api.post("/users", payload);
        }
        alert("Usuário cadastrado com sucesso!");
      }
      setEditandoId(null);
      limparCampos();
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      alert(error.response?.data?.message || "Erro ao salvar usuário");
    }
  }

  function editarUsuario(item) {
    setNome(item.name || "");
    setMatricula(item.registrationNumber || "");
    setEmail(item.email || "");
    const backendRole = item.role;
    setPerfil(backendRole === "ATTENDANT" ? "ATENDENTE" : backendRole);
    setEditandoId(item.id);
  }

  async function excluirUsuario(id) {
    if (user?.role !== "ADMIN") {
      alert("Apenas administradores podem excluir usuários (RN07).");
      return;
    }

    const confirmar = confirm("Deseja realmente excluir este usuário?");
    if (!confirmar) return;

    try {
      await api.delete(`/users/${id}`);
      alert("Usuário excluído com sucesso!");
      carregarUsuarios();
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      alert(error.response?.data?.message || "Erro ao excluir usuário");
    }
  }

  function cancelarEdicao() {
    limparCampos();
    setEditandoId(null);
  }

  const isAtendente = user?.role === "ATENDENTE";

  return (
    <div className="page">
      <div className="page-header">
        <h1>Usuários</h1>
      </div>

      <div className="form-container">
        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Matrícula"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          disabled={!!editandoId}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {!editandoId && (
          <input
            type="password"
            placeholder="Senha Inicial"
            value={senhaInicial}
            onChange={(e) => setSenhaInicial(e.target.value)}
          />
        )}

        <select
          value={perfil}
          onChange={(e) => setPerfil(e.target.value)}
          disabled={isAtendente}
        >
          {isAtendente ? (
            <option value="PROFESSOR">PROFESSOR (Permissão restrita para Atendentes)</option>
          ) : (
            <>
              <option value="">Selecione o Perfil</option>
              <option value="ADMIN">ADMIN</option>
              <option value="ATENDENTE">ATENDENTE</option>
              <option value="PROFESSOR">PROFESSOR</option>
            </>
          )}
        </select>

        <div className="buttons">
          <button onClick={salvarUsuario}>
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
        <p>Carregando usuários...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Matrícula</th>
              <th>E-mail</th>
              <th>Perfil</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.registrationNumber}</td>
                <td>{item.email}</td>
                <td>{item.role === "ATTENDANT" ? "ATENDENTE" : item.role}</td>
                <td>
                  <button className="edit-btn" onClick={() => editarUsuario(item)}>
                    Editar
                  </button>
                  {user?.role === "ADMIN" && (
                    <button className="delete-btn" onClick={() => excluirUsuario(item.id)}>
                      Excluir
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {usuarios.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>Nenhum usuário cadastrado.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}