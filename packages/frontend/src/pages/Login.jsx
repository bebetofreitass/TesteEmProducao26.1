import "../styles/login.css";

import { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

export default function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");

  const [erro, setErro] = useState("");

  async function handleLogin(e) {

    e.preventDefault();

    if (!matricula || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    if (senha.length < 4) {
      setErro("A senha deve ter no mínimo 4 caracteres");
      return;
    }

    setErro("");

    const result = await login(matricula, senha);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setErro(result.error);
    }
  }


  return (
    <div className="login-container">

      <div className="login-box">

        <div className="login-left">

          <h1>GAC</h1>

          <p>
            Sistema de Gestão de Ativos
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <h2>Entrar</h2>

          <input
            type="text"
            placeholder="Matrícula"
            value={matricula}
            onChange={(e) =>
              setMatricula(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) =>
              setSenha(e.target.value)
            }
          />

          {
            erro && (
              <span className="erro">
                {erro}
              </span>
            )
          }

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}