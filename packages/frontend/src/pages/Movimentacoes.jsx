import { useState, useEffect } from "react";
import api from "../services/api";

export default function Movimentacoes() {
  const [activeTab, setActiveTab] = useState("emprestimo");
  const [loading, setLoading] = useState(false);

  // --- ABA EMPRÉSTIMO STATE ---
  const [empMatricula, setEmpMatricula] = useState("");
  const [reservasProfessor, setReservasProfessor] = useState([]);
  const [reservaSelecionada, setReservaSelecionada] = useState(null);
  const [codigoConfirmacao, setCodigoConfirmacao] = useState("");
  const [acessoriosSelecionados, setAcessoriosSelecionados] = useState({
    controleRemoto: false,
    caboHdmi: false,
    caboPower: false
  });
  const [salaUso, setSalaUso] = useState("");

  // --- ABA DEVOLUÇÃO STATE ---
  const [devBusca, setDevBusca] = useState("");
  const [emprestimoAtivo, setEmprestimoAtivo] = useState(null);
  const [acessoriosDevolvidos, setAcessoriosDevolvidos] = useState({});
  const [marcarDefeito, setMarcarDefeito] = useState(false);
  const [descricaoDefeito, setDescricaoDefeito] = useState("");

  // --- ABA TROCA STATE ---
  const [todosEmprestimos, setTodosEmprestimos] = useState([]);
  const [emprestimoTroca, setEmprestimoTroca] = useState(null);
  const [defeitoTroca, setDefeitoTroca] = useState("");
  const [ativosDisponiveisSub, setAtivosDisponiveisSub] = useState([]);
  const [ativoSubstituto, setAtivoSubstituto] = useState("");

  // --- LISTAS AUXILIARES ---
  const [todasReservas, setTodasReservas] = useState([]);
  const [todosEmprestimosAtivos, setTodosEmprestimosAtivos] = useState([]);
  const [carregandoReservas, setCarregandoReservas] = useState(false);
  const [carregandoEmprestimos, setCarregandoEmprestimos] = useState(false);

  // --- FUNÇÕES AUXILIARES ---
  async function carregarReservasEmAberto() {
    try {
      setCarregandoReservas(true);
      const hoje = new Date();
      const trintaDiasAtras = new Date(hoje.getTime() - 30 * 24 * 60 * 60 * 1000);
      const amanha = new Date(hoje.getTime() + 24 * 60 * 60 * 1000);
      const formatarData = (d) => d.toISOString().split("T")[0];

      const response = await api.get("/reports/movements", {
        params: {
          from: formatarData(trintaDiasAtras),
          to: formatarData(amanha),
          format: "json"
        }
      });

      const movements = response.data?.movements || [];
      const abertas = movements.filter(
        (m) => m.type === "RESERVATION" && m.status === "OPEN"
      );
      setTodasReservas(abertas);
    } catch (error) {
      console.error("Erro ao carregar todas as reservas em aberto:", error);
    } finally {
      setCarregandoReservas(false);
    }
  }

  async function carregarEmprestimosAtivos() {
    try {
      setCarregandoEmprestimos(true);
      const response = await api.get("/movements/active");
      const ativos = response.data || [];
      setTodosEmprestimosAtivos(ativos);
    } catch (error) {
      console.error("Erro ao carregar empréstimos ativos:", error);
    } finally {
      setCarregandoEmprestimos(false);
    }
  }

  function selecionarReservaTabela(res) {
    setEmpMatricula(res.professorRegistrationNumber);
    setReservasProfessor([res]);
    setReservaSelecionada(res);
    setCodigoConfirmacao("");
    setSalaUso(res.room || "");
  }

  function selecionarEmprestimoTabela(emp) {
    setDevBusca(emp.professorRegistrationNumber);
    setEmprestimoAtivo(emp);
    const accs = {};
    (emp.loanedAccessories || []).forEach((acc) => {
      accs[acc] = true;
    });
    setAcessoriosDevolvidos(accs);
    setMarcarDefeito(false);
    setDescricaoDefeito("");
  }

  async function buscarReservas() {
    if (!empMatricula) return;
    try {
      setLoading(true);
      const response = await api.get("/reservations", {
        params: { professorRegistrationNumber: empMatricula }
      });
      const reservados = response.data || [];
      setReservasProfessor(reservados);
      setReservaSelecionada(null);
      if (reservados.length === 0) {
        alert("Nenhuma reserva encontrada para a matrícula informada.");
      }
    } catch (error) {
      console.error("Erro ao carregar reservas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function confirmarEmprestimo() {
    if (!reservaSelecionada) {
      alert("Selecione uma reserva.");
      return;
    }
    if (!codigoConfirmacao || codigoConfirmacao.length !== 4) {
      alert("Informe o código de confirmação de 4 dígitos (RN12).");
      return;
    }
    if (!salaUso) {
      alert("Informe a sala de uso.");
      return;
    }

    const acessorios = Object.keys(acessoriosSelecionados).filter(
      (k) => acessoriosSelecionados[k]
    );

    const payload = {
      reservationId: reservaSelecionada.id,
      confirmationCode: codigoConfirmacao,
      room: salaUso,
      loanedAccessories: acessorios
    };

    try {
      await api.post("/movements/loans", payload);
      alert("Empréstimo registrado com sucesso!");
      setEmpMatricula("");
      setReservasProfessor([]);
      setReservaSelecionada(null);
      setCodigoConfirmacao("");
      setSalaUso("");
      setAcessoriosSelecionados({ controleRemoto: false, caboHdmi: false, caboPower: false });
      carregarReservasEmAberto();
    } catch (error) {
      console.error("Erro ao registrar empréstimo:", error);
      alert(error.response?.data?.message || "Erro ao registrar empréstimo. Verifique o código informando.");
    }
  }

  async function buscarEmprestimo() {
    if (!devBusca) return;
    try {
      setLoading(true);
      const response = await api.get("/movements/active");
      const movs = response.data || [];
      const emprestimo = movs.find(
        (m) =>
          m.professorRegistrationNumber === devBusca ||
          m.assetId === Number(devBusca)
      );

      if (emprestimo) {
        setEmprestimoAtivo(emprestimo);
        const accs = {};
        (emprestimo.loanedAccessories || []).forEach((acc) => {
          accs[acc] = true;
        });
        setAcessoriosDevolvidos(accs);
        setMarcarDefeito(false);
        setDescricaoDefeito("");
      } else {
        setEmprestimoAtivo(null);
        alert("Nenhum empréstimo ativo encontrado para essa busca.");
      }
    } catch (error) {
      console.error("Erro ao buscar empréstimo:", error);
    } finally {
      setLoading(false);
    }
  }

  async function confirmarDevolucao() {
    if (!emprestimoAtivo) return;
    if (marcarDefeito && !descricaoDefeito) {
      alert("A descrição do defeito é obrigatória em caso de avaria (RN06).");
      return;
    }

    const payload = {
      loanId: emprestimoAtivo.id,
      hasDefect: marcarDefeito,
      defectDescription: marcarDefeito ? descricaoDefeito : "",
      returnedAccessories: Object.keys(acessoriosDevolvidos).filter(
        (k) => acessoriosDevolvidos[k]
      )
    };

    try {
      await api.post("/movements/returns", payload);
      alert("Devolução registrada com sucesso!");
      setEmprestimoAtivo(null);
      setDevBusca("");
      carregarEmprestimosAtivos();
    } catch (error) {
      console.error("Erro ao registrar devolução:", error);
      alert(error.response?.data?.message || "Erro ao registrar devolução.");
    }
  }

  async function carregarDadosTroca() {
    try {
      setLoading(true);
      const [resMovs, resAtivos] = await Promise.all([
        api.get("/movements/active"),
        api.get("/assets")
      ]);

      const movs = resMovs.data || [];
      const ativos = resAtivos.data || [];

      setTodosEmprestimos(movs);
      setAtivosDisponiveisSub(ativos.filter((a) => a.status === "AVAILABLE"));
    } catch (error) {
      console.error("Erro ao carregar dados de troca:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "emprestimo") {
      carregarReservasEmAberto();
    } else if (activeTab === "devolucao") {
      carregarEmprestimosAtivos();
    } else if (activeTab === "troca") {
      carregarDadosTroca();
      setEmprestimoTroca(null);
      setDefeitoTroca("");
      setAtivoSubstituto("");
    }
  }, [activeTab]);

  async function confirmarTroca() {
    if (!emprestimoTroca) {
      alert("Selecione o empréstimo a ser trocado.");
      return;
    }
    if (!defeitoTroca) {
      alert("A descrição do defeito é obrigatória para troca por defeito (RN06).");
      return;
    }
    if (!ativoSubstituto) {
      alert("Selecione um ativo substituto disponível.");
      return;
    }

    const payload = {
      loanId: emprestimoTroca.id,
      substituteAssetType: emprestimoTroca.assetType,
      substituteAssetId: Number(ativoSubstituto),
      defectDescription: defeitoTroca,
      room: emprestimoTroca.room,
      loanedAccessories: emprestimoTroca.loanedAccessories
    };

    try {
      await api.post("/movements/exchanges", payload);
      alert("Troca por defeito realizada com sucesso!");
      carregarDadosTroca();
      setEmprestimoTroca(null);
      setDefeitoTroca("");
      setAtivoSubstituto("");
    } catch (error) {
      console.error("Erro ao realizar troca:", error);
      alert(error.response?.data?.message || "Erro ao realizar troca por defeito.");
    }
  }

  return (
    <div className="page" style={{ padding: "20px" }}>
      <div className="page-header" style={{ marginBottom: "30px" }}>
        <h1 style={{ color: "#0d3b66" }}>Movimentações Patrimoniais</h1>
        <p style={{ color: "#64748b" }}>Retiradas de reservas, devoluções e trocas por avaria.</p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "2px solid #e2e8f0", marginBottom: "25px" }}>
        <button
          onClick={() => setActiveTab("emprestimo")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "transparent",
            borderBottom: activeTab === "emprestimo" ? "3px solid #0d3b66" : "none",
            fontWeight: activeTab === "emprestimo" ? "bold" : "normal",
            color: activeTab === "emprestimo" ? "#0d3b66" : "#64748b",
            cursor: "pointer"
          }}
        >
          Retirada / Empréstimo
        </button>
        <button
          onClick={() => setActiveTab("devolucao")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "transparent",
            borderBottom: activeTab === "devolucao" ? "3px solid #0d3b66" : "none",
            fontWeight: activeTab === "devolucao" ? "bold" : "normal",
            color: activeTab === "devolucao" ? "#0d3b66" : "#64748b",
            cursor: "pointer"
          }}
        >
          Devolução / Retorno
        </button>
        <button
          onClick={() => setActiveTab("troca")}
          style={{
            padding: "10px 20px",
            border: "none",
            backgroundColor: "transparent",
            borderBottom: activeTab === "troca" ? "3px solid #0d3b66" : "none",
            fontWeight: activeTab === "troca" ? "bold" : "normal",
            color: activeTab === "troca" ? "#0d3b66" : "#64748b",
            cursor: "pointer"
          }}
        >
          Troca por Defeito
        </button>
      </div>

      {/* TAB CONTENT: EMPRÉSTIMO */}
      {activeTab === "emprestimo" && (
        <div className="tab-content" style={{ display: "flex", gap: "30px", alignItems: "flex-start", flexWrap: "wrap", width: "100%" }}>
          <div style={{ flex: 1, minWidth: "320px", maxWidth: "600px" }}>
            <h2 style={{ color: "#0d3b66", marginBottom: "20px" }}>Realizar Empréstimo</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Matrícula do Professor"
                value={empMatricula}
                onChange={(e) => setEmpMatricula(e.target.value)}
                style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <button
                onClick={buscarReservas}
                style={{
                  backgroundColor: "#0d3b66",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Buscar Reservas
              </button>
            </div>

            {reservasProfessor.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                  Selecione o ativo reservado:
                </label>
                <select
                  onChange={(e) => {
                    const id = Number(e.target.value);
                    setReservaSelecionada(reservasProfessor.find((r) => r.id === id) || null);
                  }}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                >
                  <option value="">Selecione...</option>
                  {reservasProfessor.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.assetType === "PROJECTOR"
                        ? `Projetor (ID Ativo: ${item.assetId})`
                        : `Chave (ID Ativo: ${item.assetId})`}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {reservaSelecionada && (
              <div style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginTop: "20px"
              }}>
                <h3 style={{ marginBottom: "15px", color: "#0d3b66" }}>Detalhes da Liberação</h3>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Código de Confirmação (4 dígitos)
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="Ex: 1234"
                    value={codigoConfirmacao}
                    onChange={(e) => setCodigoConfirmacao(e.target.value)}
                    style={{
                      padding: "10px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                      fontSize: "1.2rem",
                      letterSpacing: "4px",
                      textAlign: "center",
                      width: "120px"
                    }}
                  />
                </div>

                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                    Sala de Uso / Local
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Bloco H - Sala H102"
                    value={salaUso}
                    onChange={(e) => setSalaUso(e.target.value)}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </div>

                {reservaSelecionada.assetType === "PROJECTOR" && (
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
                      Acessórios Retirados (Opcional):
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="checkbox"
                          checked={acessoriosSelecionados.controleRemoto}
                          onChange={(e) => setAcessoriosSelecionados({ ...acessoriosSelecionados, controleRemoto: e.target.checked })}
                        />
                        Controle Remoto
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="checkbox"
                          checked={acessoriosSelecionados.caboHdmi}
                          onChange={(e) => setAcessoriosSelecionados({ ...acessoriosSelecionados, caboHdmi: e.target.checked })}
                        />
                        Cabo HDMI
                      </label>
                      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                          type="checkbox"
                          checked={acessoriosSelecionados.caboPower}
                          onChange={(e) => setAcessoriosSelecionados({ ...acessoriosSelecionados, caboPower: e.target.checked })}
                        />
                        Cabo de Energia
                      </label>
                    </div>
                  </div>
                )}

                <button
                  onClick={confirmarEmprestimo}
                  style={{
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: "bold"
                  }}
                >
                  Confirmar Saída
                </button>
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: "320px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ color: "#0d3b66", marginBottom: "15px" }}>Reservas em Aberto (Aguardando Retirada)</h3>
            {carregandoReservas ? (
              <p>Carregando reservas...</p>
            ) : todasReservas.length === 0 ? (
              <p style={{ color: "#64748b" }}>Nenhuma reserva em aberto no momento.</p>
            ) : (
              <table style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                <thead>
                  <tr>
                    <th>Ativo</th>
                    <th>Professor</th>
                    <th>Local</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {todasReservas.map((res) => (
                    <tr key={res.id}>
                      <td>{res.assetType === "PROJECTOR" ? "Projetor" : "Chave"} (ID: {res.assetId})</td>
                      <td>{res.professorRegistrationNumber}</td>
                      <td>{res.room || "-"}</td>
                      <td>
                        <button
                          onClick={() => selecionarReservaTabela(res)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#0d3b66",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}
                        >
                          Selecionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DEVOLUÇÃO */}
      {activeTab === "devolucao" && (
        <div className="tab-content" style={{ display: "flex", gap: "30px", alignItems: "flex-start", flexWrap: "wrap", width: "100%" }}>
          <div style={{ flex: 1, minWidth: "320px", maxWidth: "600px" }}>
            <h2 style={{ color: "#0d3b66", marginBottom: "20px" }}>Registrar Devolução</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <input
                type="text"
                placeholder="Matrícula do Prof. ou ID do Ativo"
                value={devBusca}
                onChange={(e) => setDevBusca(e.target.value)}
                style={{ flex: 1, padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <button
                onClick={buscarEmprestimo}
                style={{
                  backgroundColor: "#0d3b66",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Buscar Empréstimo
              </button>
            </div>

            {emprestimoAtivo && (
              <div style={{
                backgroundColor: "#f8fafc",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                marginTop: "20px"
              }}>
                <h3 style={{ marginBottom: "15px", color: "#0d3b66" }}>
                  Empréstimo em Curso:{" "}
                  {emprestimoAtivo.assetType === "PROJECTOR"
                    ? `Projetor (ID Ativo: ${emprestimoAtivo.assetId})`
                    : `Chave (ID Ativo: ${emprestimoAtivo.assetId})`}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#64748b", marginBottom: "15px" }}>
                  Professor: <strong>{emprestimoAtivo.professorRegistrationNumber}</strong> <br />
                  Finalidade: {emprestimoAtivo.academicPurpose || "Não informada"} <br />
                  Horário de Saída: {new Date(emprestimoAtivo.checkedOutAt).toLocaleString()}
                </p>

                {emprestimoAtivo.loanedAccessories && emprestimoAtivo.loanedAccessories.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px" }}>
                      Confirmar Retorno dos Acessórios Emprestados:
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {emprestimoAtivo.loanedAccessories.map((acc) => (
                        <label key={acc} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <input
                            type="checkbox"
                            checked={acessoriosDevolvidos[acc] || false}
                            onChange={(e) => setAcessoriosDevolvidos({ ...acessoriosDevolvidos, [acc]: e.target.checked })}
                          />
                          {acc === "controleRemoto" ? "Controle Remoto" : acc === "caboHdmi" ? "Cabo HDMI" : acc === "caboPower" ? "Cabo de Energia" : acc}
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: "20px", borderTop: "1px solid #e2e8f0", paddingTop: "15px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "bold", marginBottom: "10px", color: "#ef4444" }}>
                    <input
                      type="checkbox"
                      checked={marcarDefeito}
                      onChange={(e) => setMarcarDefeito(e.target.checked)}
                    />
                    Ativo Devolvido com Defeito (Enviar para Manutenção)
                  </label>

                  {marcarDefeito && (
                    <div>
                      <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                        Descrição do Defeito (Obrigatório - RN06)
                      </label>
                      <textarea
                        placeholder="Descreva o problema técnico observado..."
                        value={descricaoDefeito}
                        onChange={(e) => setDescricaoDefeito(e.target.value)}
                        rows={3}
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          fontFamily: "inherit"
                        }}
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={confirmarDevolucao}
                  style={{
                    backgroundColor: "#0d3b66",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: "bold"
                  }}
                >
                  Confirmar Devolução
                </button>
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: "320px", backgroundColor: "#f8fafc", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
            <h3 style={{ color: "#0d3b66", marginBottom: "15px" }}>Empréstimos Ativos (Aguardando Devolução)</h3>
            {carregandoEmprestimos ? (
              <p>Carregando empréstimos...</p>
            ) : todosEmprestimosAtivos.length === 0 ? (
              <p style={{ color: "#64748b" }}>Nenhum empréstimo ativo no momento.</p>
            ) : (
              <table style={{ marginTop: "10px", fontSize: "0.9rem" }}>
                <thead>
                  <tr>
                    <th>Ativo</th>
                    <th>Professor</th>
                    <th>Local</th>
                    <th>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {todosEmprestimosAtivos.map((emp) => (
                    <tr key={emp.id}>
                      <td>{emp.assetType === "PROJECTOR" ? "Projetor" : "Chave"} (ID: {emp.assetId})</td>
                      <td>{emp.professorRegistrationNumber}</td>
                      <td>{emp.room || "-"}</td>
                      <td>
                        <button
                          onClick={() => selecionarEmprestimoTabela(emp)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#0d3b66",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: "bold"
                          }}
                        >
                          Selecionar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: TROCA POR DEFEITO */}
      {activeTab === "troca" && (
        <div className="tab-content" style={{ maxWidth: "600px" }}>
          <h2 style={{ color: "#0d3b66", marginBottom: "20px" }}>Troca Rápida de Ativo por Defeito</h2>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
              Selecione o Empréstimo em Curso com Defeito:
            </label>
            <select
              onChange={(e) => {
                const id = Number(e.target.value);
                setEmprestimoTroca(todosEmprestimos.find((m) => m.id === id) || null);
              }}
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
            >
              <option value="">Selecione...</option>
              {todosEmprestimos.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.professorRegistrationNumber} - {item.assetType === "PROJECTOR"
                    ? `Projetor (ID Ativo: ${item.assetId})`
                    : `Chave (ID Ativo: ${item.assetId})`}
                </option>
              ))}
            </select>
          </div>

          {emprestimoTroca && (
            <div style={{
              backgroundColor: "#f8fafc",
              padding: "20px",
              borderRadius: "8px",
              border: "1px solid #e2e8f0",
              marginTop: "20px"
            }}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
                  Descrição Obrigatória do Defeito (RN06)
                </label>
                <textarea
                  placeholder="Qual foi a falha técnica apresentada?"
                  value={defeitoTroca}
                  onChange={(e) => setDefeitoTroca(e.target.value)}
                  rows={3}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "8px" }}>
                  Selecione o Ativo Substituto Disponível:
                </label>
                <select
                  value={ativoSubstituto}
                  onChange={(e) => setAtivoSubstituto(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                >
                  <option value="">Selecione...</option>
                  {ativosDisponiveisSub
                    .filter((a) => a.type === emprestimoTroca.assetType)
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                </select>
                {ativosDisponiveisSub.filter((a) => a.type === emprestimoTroca.assetType).length === 0 && (
                  <span style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "5px", display: "block" }}>
                    Não há outros ativos substitutos disponíveis no momento.
                  </span>
                )}
              </div>

              <button
                onClick={confirmarTroca}
                style={{
                  backgroundColor: "#eab308",
                  color: "black",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  width: "100%",
                  fontWeight: "bold"
                }}
              >
                Efetuar Troca por Substituição
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
