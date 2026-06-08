import { useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../contexts/AuthContext";

export default function AlterarSenha() {
  const { user } = useContext(AuthContext);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      alert("Preencha todos os campos");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      alert("A nova senha e a confirmação não coincidem.");
      return;
    }

    if (novaSenha.length < 6) {
      alert("A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        currentPassword: senhaAtual,
        newPassword: novaSenha,
        confirmNewPassword: confirmarSenha
      };

      await api.patch("/users/me/password", payload);
      alert("Senha alterada com sucesso!");
      setSenhaAtual("");
      setNovaSenha("");
      setConfirmarSenha("");
    } catch (error) {
      console.error("Erro ao alterar senha:", error);
      alert(error.response?.data?.message || "Erro ao alterar senha. Verifique se a senha atual está correta.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page" style={{ padding: "20px", maxWidth: "450px" }}>
      <div className="page-header" style={{ marginBottom: "25px" }}>
        <h1 style={{ color: "#0d3b66" }}>Alterar Senha</h1>
        <p style={{ color: "#64748b" }}>Mantenha sua conta segura alterando sua senha de acesso periodicamente (UC18).</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Senha Atual</label>
          <input
            type="password"
            placeholder="Digite sua senha atual"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Nova Senha</label>
          <input
            type="password"
            placeholder="Digite a nova senha (min. 6 caracteres)"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={{ fontWeight: "bold" }}>Confirmar Nova Senha</label>
          <input
            type="password"
            placeholder="Confirme a nova senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#0d3b66",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "6px",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          {loading ? "Processando..." : "Alterar Senha"}
        </button>
      </form>
    </div>
  );
}
