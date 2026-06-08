# gac-frontend — Frontend

Interface web do sistema **GAC** (Gestão de Ativos Computacionais) do CCT/UNIFOR.  
Desenvolvida com **React 19 + Vite 7** integrada à API REST do backend.

---

## 🛠️ Stack

| Tecnologia | Versão | Função |
|---|---|---|
| React | 19.1 | Framework UI |
| React Router DOM | 7.16 | Roteamento SPA |
| Axios | 1.16 | Requisições HTTP à API |
| React Icons | 5.6 | Ícones |
| Vite | 7.1 | Build tool e dev server |
| SWC | (plugin) | Compilação rápida de JSX |
| ESLint | 9.32 | Linter |
| CSS3 | — | Estilização (Vanilla CSS por módulo) |

---

## 🏗️ Estrutura

```
src/
├── components/
│   ├── Navbar.jsx           # Barra de navegação superior
│   ├── Sidebar.jsx          # Menu lateral
│   └── ProtectedRoute.jsx   # HOC de proteção de rota por role
│
├── contexts/
│   └── AuthContext.jsx      # Contexto global de autenticação (JWT + role)
│
├── pages/
│   ├── Login.jsx            # Tela de login
│   ├── Dashboard.jsx        # Visão geral — cards e últimas movimentações
│   ├── Projetores.jsx       # CRUD de projetores
│   ├── Chaves.jsx           # CRUD de chaves
│   ├── Usuarios.jsx         # Gestão de usuários e professores
│   ├── Relatorios.jsx       # Relatórios por período
│   ├── Movimentacoes.jsx    # Central de movimentações (empréstimo/devolução)
│   ├── ProfessorReservas.jsx # Tela de reservas do professor
│   ├── LiberarManutencao.jsx # Liberação de ativos em manutenção
│   └── AlterarSenha.jsx     # Troca de senha do usuário logado
│
├── routes/
│   └── AppRoutes.jsx        # Definição de todas as rotas e guards
│
├── services/
│   └── api.js               # Instância Axios configurada com baseURL e JWT
│
├── styles/
│   ├── global.css
│   ├── login.css
│   ├── dashboard.css
│   ├── navbar.css
│   ├── sidebar.css
│   ├── projetores.css
│   ├── chaves.css
│   ├── usuarios.css
│   └── relatorios.css
│
├── App.jsx
└── main.jsx
```

---

## 📍 Rotas

| Rota | Página | Roles permitidos |
|---|---|---|
| `/` | Login | Público |
| `/dashboard` | Dashboard | ADMIN, ATENDENTE, PROFESSOR |
| `/projetores` | Projetores | ADMIN, ATENDENTE |
| `/chaves` | Chaves | ADMIN, ATENDENTE |
| `/usuarios` | Usuários | ADMIN, ATENDENTE |
| `/relatorios` | Relatórios | ADMIN, ATENDENTE |
| `/movimentacoes` | Movimentações | ADMIN, ATENDENTE |
| `/manutencao` | Liberar Manutenção | ADMIN, ATENDENTE |
| `/reservar` | Reservas (professor) | PROFESSOR |
| `/alterar-senha` | Alterar Senha | ADMIN, ATENDENTE, PROFESSOR |

---

## ▶️ Como executar

### Pré-requisitos

- Node.js 18+
- Backend (`gac-api`) rodando em `http://localhost:8080`

### Instalação e execução

```bash
# A partir de packages/frontend/
npm install
npm run dev
# App disponível em http://localhost:5173
```

### Scripts disponíveis

```bash
npm run dev       # Dev server com HMR
npm run build     # Build de produção (dist/)
npm run preview   # Preview do build
npm run lint      # ESLint
```

---

## 🔐 Autenticação

O token JWT obtido no login é armazenado no `localStorage` e injetado automaticamente em todas as requisições via interceptor Axios.

O `AuthContext` expõe:
- `user` — dados do usuário logado (id, nome, role)
- `token` — JWT atual
- `login(registrationNumber, password)` — realiza login na API
- `logout()` — limpa sessão e redireciona para `/`

Rotas protegidas pelo `ProtectedRoute` redirecionam para `/` caso o usuário não esteja autenticado ou não possua a role necessária.

---

## 🌐 Deploy

| Ambiente | URL |
|---|---|
| Vercel (produção) | https://front-trabalhoweb-cmsvnw3vt-gabriels-projects-f0aa4a5b.vercel.app |

---

## 👨‍💻 Desenvolvedores

- Pedro Alberto
- Breno Oliveira
- Gabriel Vieira
- João Pedro

---

## 📄 Licença

Projeto acadêmico — CCT/UNIFOR.
