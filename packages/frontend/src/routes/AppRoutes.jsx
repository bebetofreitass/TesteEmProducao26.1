import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Projetores from "../pages/Projetores";
import Chaves from "../pages/Chaves";
import Usuarios from "../pages/Usuarios";
import Relatorios from "../pages/Relatorios";
import ProfessorReservas from "../pages/ProfessorReservas";
import Movimentacoes from "../pages/Movimentacoes";
import LiberarManutencao from "../pages/LiberarManutencao";
import AlterarSenha from "../pages/AlterarSenha";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProtectedRoute from "../components/ProtectedRoute";

function Layout({ children }) {
  return (
    <div className="layout">

      <Sidebar />

      <div className="content">

        <Navbar />

        {children}

      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE", "PROFESSOR"]}>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/projetores"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Layout>
                <Projetores />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/chaves"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Layout>
                <Chaves />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Layout>
                <Usuarios />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/relatorios"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Layout>
                <Relatorios />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/reservar"
          element={
            <ProtectedRoute allowedRoles={["PROFESSOR"]}>
              <Layout>
                <ProfessorReservas />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/movimentacoes"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Layout>
                <Movimentacoes />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/manutencao"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE"]}>
              <Layout>
                <LiberarManutencao />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/alterar-senha"
          element={
            <ProtectedRoute allowedRoles={["ADMIN", "ATENDENTE", "PROFESSOR"]}>
              <Layout>
                <AlterarSenha />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}