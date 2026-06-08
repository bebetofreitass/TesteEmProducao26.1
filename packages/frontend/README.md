# 📌 GAC - Sistema de Gestão de Ativos

## 📖 Sobre o Projeto

O GAC (Gestão de Ativos Computacionais) é um sistema web desenvolvido para realizar o gerenciamento de ativos institucionais, permitindo o controle de:

- Projetores
- Chaves
- Usuários
- Relatórios
- Empréstimos e reservas

O objetivo do sistema é facilitar o controle administrativo dos recursos da instituição, proporcionando organização, rastreabilidade e gerenciamento eficiente dos ativos.

---

# Link Vercel

https://front-trabalhoweb-cmsvnw3vt-gabriels-projects-f0aa4a5b.vercel.app

---

# 🚀 Tecnologias Utilizadas

## Frontend

- React
- React Router DOM
- CSS3
- Axios
- Vite

## Backend

- Java
- Spring Boot
- JWT Authentication
- MySQL / PostgreSQL

---

# 📂 Estrutura do Projeto

```bash
src/
│
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Projetores.jsx
│   ├── Chaves.jsx
│   ├── Usuarios.jsx
│   └── Relatorios.jsx
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
├── services/
│   └── api.js
│
├── routes/
│   └── AppRoutes.jsx
│
├── contexts/
│   └── AuthContext.jsx
│
├── App.jsx
└── main.jsx
```

---

# 🔐 Funcionalidades

## ✅ Login

- Tela de autenticação
- Validação de acesso
- Proteção de rotas
- Controle de sessão

---

## ✅ Dashboard

- Visão geral do sistema
- Cards informativos
- Estatísticas rápidas
- Interface responsiva

---

## ✅ Gerenciamento de Projetores

- Cadastro de projetores
- Edição de registros
- Exclusão de registros
- Listagem dinâmica
- Controle de status

---

## ✅ Gerenciamento de Chaves

- Cadastro de chaves
- Edição de registros
- Exclusão de registros
- Controle de disponibilidade

---

## ✅ Gerenciamento de Usuários

- Cadastro de usuários
- Edição de registros
- Exclusão de registros
- Controle de perfis:
  - ADMIN
  - ATENDENTE
  - PROFESSOR

---

## ✅ Relatórios

- Filtro por período
- Consulta de movimentações
- Exibição dinâmica em tabela
- Organização de informações

---

# ⚙️ Como Executar o Projeto

## 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

---

## 2. Acesse a pasta do projeto

```bash
cd nome-do-projeto
```

---

## 3. Instale as dependências

```bash
npm install
```

---

## 4. Execute o projeto

```bash
npm run dev
```

---

## 5. Abra no navegador

```bash
http://localhost:5173
```

---

# 🔗 Integração com Backend

O frontend está preparado para integração com uma API REST desenvolvida em Spring Boot.

A comunicação entre frontend e backend será realizada utilizando Axios.

Exemplo:

```js
const response = await api.get("/projetores");
```

---

# 🔒 Autenticação

O sistema utiliza autenticação baseada em JWT.

O token de autenticação é armazenado no:

```js
localStorage
```

---

# 📱 Responsividade

O sistema possui adaptação para:

- Desktop
- Tablets
- Smartphones

---

# 🎯 Objetivo Acadêmico

Este projeto foi desenvolvido com fins acadêmicos para aplicação prática de conceitos de:

- Frontend React
- Arquitetura de Sistemas
- CRUD
- Rotas protegidas
- Context API
- Integração Full Stack
- Responsividade
- Organização de código

---

# 🛠️ Funcionalidades Futuras

- Integração completa com backend
- Persistência em banco de dados
- Exportação de relatórios PDF
- Dashboard com gráficos
- Sistema de permissões
- Histórico de movimentações
- Controle de empréstimos

---

# 👨‍💻 Desenvolvedores

- Pedro Alberto
- Breno Oliveira
- Gabriel Vieira
- João Pedro

---

# 📄 Licença

Projeto desenvolvido para fins educacionais.
