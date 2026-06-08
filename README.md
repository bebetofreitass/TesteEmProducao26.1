# GAC — Gestão de Ativos Computacionais

Sistema web para controle patrimonial de projetores e chaves do **CCT/UNIFOR**.  
Gerencia empréstimos, devoluções, reservas e relatórios de movimentação.

> 📄 Documento completo de requisitos: [REQUISITOS.md](./REQUISITOS.md)

---

## 🏗️ Estrutura do Monorepo

```
TesteEmProducao26.1/
├── REQUISITOS.md              ← Documento de Requisitos GAC v1.3
├── packages/
│   ├── backend/               ← API REST (Java 21 + Spring Boot 4)
│   └── frontend/              ← SPA (React 19 + Vite 7)
```

| Package | Stack | Porta padrão |
|---|---|---|
| [`packages/backend`](./packages/backend/README.md) | Java 21, Spring Boot 4, JWT, H2 | `8080` |
| [`packages/frontend`](./packages/frontend/README.md) | React 19, Vite 7, Axios | `5173` |

---

## ▶️ Como rodar o projeto

### 1. Backend

```bash
cd packages/backend
./gradlew bootRun
# API disponível em http://localhost:8080
# Swagger UI em http://localhost:8080/swagger-ui.html
```

### 2. Frontend

```bash
cd packages/frontend
npm install
npm run dev
# App disponível em http://localhost:5173
```

---

## 🔐 Perfis de acesso

| Role | Descrição |
|---|---|
| `ADMIN` | Administrador — acesso total, gerencia usuários e exclui ativos |
| `ATENDENTE` | Secretaria — registra empréstimos, devoluções e trocas |
| `PROFESSOR` | Docente — faz reservas e consulta histórico |

---

## ✨ Funcionalidades principais

- 🔑 **Autenticação JWT** com proteção de rotas por perfil
- 📽️ **Gestão de projetores** — cadastro, edição, exclusão e controle de acessórios
- 🗝️ **Gestão de chaves** — controle de chaves de salas/laboratórios e chaves reserva
- 📅 **Reservas** — professor reserva antecipadamente; código de 4 dígitos para retirada
- 🔄 **Movimentações** — empréstimo, devolução e troca por defeito
- ⏱️ **Expiração automática** de reservas não retiradas (job agendado)
- 📊 **Relatórios** de movimentação por período com exportação CSV
- 👥 **Gestão de usuários** e professores com controle de roles

---

## 🌐 Deploy

| Ambiente | URL |
|---|---|
| Frontend (Vercel) | https://front-trabalhoweb-cmsvnw3vt-gabriels-projects-f0aa4a5b.vercel.app |
| Backend | — |

---

## 👨‍💻 Desenvolvedores

- Pedro Alberto
- Breno Oliveira
- Gabriel Vieira
- João Pedro
- Carlos Alberto
- Leonardo Oliveira
- Mateus Teles

---

## 📄 Licença

Projeto acadêmico — CCT/UNIFOR.
