import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setAuthenticated(true);
    } else {
      logout();
    }
    setLoading(false);
  }, []);

  async function login(matricula, senha) {
    try {
      const response = await api.post("/auth/login", {
        registrationNumber: matricula,
        password: senha
      });
      const { accessToken, user: userData } = response.data;

      const normalizedUser = {
        id: userData.id,
        nome: userData.name,
        email: userData.email,
        matricula: userData.registrationNumber,
        role: userData.role === "ATTENDANT" ? "ATENDENTE" : userData.role
      };

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(normalizedUser));

      setUser(normalizedUser);
      setAuthenticated(true);
      return { success: true };
    } catch (error) {
      console.error("Erro no login:", error);
      const msg = error.response?.data?.message || "Erro de conexão com o servidor. Verifique suas credenciais.";
      return { success: false, error: msg };
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        loading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}