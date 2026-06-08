# gac-api — Backend

API REST do sistema **GAC** (Gestão de Ativos Computacionais) do CCT/UNIFOR.  
Desenvolvida com **Java 21 + Spring Boot 4** seguindo Clean Architecture.

---

## 🛠️ Stack

| Tecnologia | Versão | Função |
|---|---|---|
| Java | 21 | Linguagem |
| Spring Boot | 4.0.6 | Framework web |
| Spring Security | (Boot) | Autenticação e autorização |
| Spring Data JPA | (Boot) | Persistência |
| H2 Database | (runtime) | Banco em memória (dev) |
| JWT (jjwt) | 0.12.6 | Tokens de autenticação |
| Springdoc OpenAPI | 3.0.3 | Swagger UI |
| Lombok | (compile) | Redução de boilerplate |
| Gradle | Wrapper | Build |

---

## 🏗️ Arquitetura

O projeto segue **Clean Architecture** em camadas:

```
src/main/java/com/gac/api/
├── domain/                  # Entidades e exceções de negócio
│   ├── model/
│   └── exception/
├── application/             # Casos de uso (services) e DTOs de comando
│   ├── service/
│   └── dto/
├── infrastructure/          # JPA, segurança, scheduler
│   ├── persistence/
│   ├── security/
│   └── scheduler/
└── presentation/            # Controllers, DTOs de request/response, mappers
    ├── controller/
    ├── dto/
    └── mapper/
```

---

## ▶️ Como executar

### Pré-requisitos

- Java 21+
- Sem banco externo necessário — usa H2 em memória por padrão.

### Rodando com Gradle Wrapper

```bash
# A partir de packages/backend/
./gradlew bootRun
```

A API sobe em **`http://localhost:8080`**.

### Console H2 (banco em memória)

Disponível em `http://localhost:8080/h2-console`  
- **JDBC URL:** `jdbc:h2:mem:gac`  
- **User:** `sa` / **Password:** _(vazio)_

### Swagger UI

Documentação interativa disponível em:  
`http://localhost:8080/swagger-ui.html`

---

## 🔐 Autenticação

Todas as rotas (exceto `/api/auth/login`) exigem header:

```http
Authorization: Bearer <JWT>
```

O token é obtido via `POST /api/auth/login` e expira em **24 horas** (configurável em `application.properties`).

### Roles disponíveis

| Role | Descrição |
|---|---|
| `ADMIN` | Administrador / Gestor — permissões completas |
| `ATTENDANT` | Atendente — operações cotidianas |
| `PROFESSOR` | Docente — reservas e consultas |

---

## 📡 Endpoints

### 🔑 Auth — `/api/auth`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `POST` | `/api/auth/login` | Público | Autentica e retorna JWT |

---

### 👤 Usuários — `/api/users`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `GET` | `/api/users/me` | Todos | Perfil do usuário logado |
| `PATCH` | `/api/users/me/password` | Todos | Alterar própria senha (UC18) |
| `POST` | `/api/users` | ADMIN | Cadastrar atendente/gestor (UC01) |
| `GET` | `/api/users` | ADMIN | Listar usuários internos |
| `GET` | `/api/users/{id}` | ADMIN | Buscar usuário por ID |
| `PUT` | `/api/users/{id}` | ADMIN | Atualizar usuário |
| `DELETE` | `/api/users/{id}` | ADMIN | Excluir usuário |

---

### 🎓 Professores — `/api/professors`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `POST` | `/api/professors` | ADMIN, ATTENDANT | Cadastrar professor (UC02) |
| `GET` | `/api/professors` | ADMIN, ATTENDANT | Listar professores |

---

### 📽️ Projetores — `/api/projectors`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `POST` | `/api/projectors` | ADMIN, ATTENDANT | Cadastrar projetor (UC08) |
| `GET` | `/api/projectors` | Todos | Listar projetores |
| `GET` | `/api/projectors/{id}` | Todos | Buscar projetor por ID |
| `PUT` | `/api/projectors/{id}` | ADMIN, ATTENDANT | Editar projetor (UC13) |
| `DELETE` | `/api/projectors/{id}` | ADMIN | Excluir projetor (UC14) |

---

### 🔑 Chaves — `/api/keys`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `POST` | `/api/keys` | ADMIN, ATTENDANT | Cadastrar chave (UC08) |
| `GET` | `/api/keys` | Todos | Listar chaves |
| `GET` | `/api/keys/{id}` | Todos | Buscar chave por ID |
| `PUT` | `/api/keys/{id}` | ADMIN, ATTENDANT | Editar chave / marcar reserva (UC10, UC13) |
| `DELETE` | `/api/keys/{id}` | ADMIN | Excluir chave (UC14) |

---

### 📅 Reservas — `/api/reservations`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `POST` | `/api/reservations` | PROFESSOR | Criar reserva (UC11) — gera código de 4 dígitos |
| `GET` | `/api/reservations/me` | PROFESSOR | Listar próprias reservas em aberto |
| `GET` | `/api/reservations?professorRegistrationNumber=` | ADMIN, ATTENDANT | Listar reservas por matrícula |
| `DELETE` | `/api/reservations/{id}` | PROFESSOR | Cancelar reserva própria |

---

### 🔄 Movimentações — `/api/movements`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `POST` | `/api/movements/loans` | ADMIN, ATTENDANT | Confirmar empréstimo mediante reserva + código (UC03) |
| `POST` | `/api/movements/returns` | ADMIN, ATTENDANT | Registrar devolução, íntegra ou com defeito (UC04) |
| `POST` | `/api/movements/exchanges` | ADMIN, ATTENDANT | Troca por defeito durante empréstimo ativo (UC05) |
| `GET` | `/api/movements/active` | ADMIN, ATTENDANT | Listar empréstimos ativos |
| `GET` | `/api/movements/me` | PROFESSOR | Histórico de movimentações do professor (UC12) |
| `GET` | `/api/movements/me/pending` | PROFESSOR | Pendências do professor (UC12) |

---

### 📊 Relatórios — `/api/reports`

| Método | Rota | Role | Descrição |
|---|---|---|---|
| `GET` | `/api/reports/movements?from=YYYY-MM-DD&to=YYYY-MM-DD&format=json\|csv` | ADMIN, ATTENDANT | Relatório de movimentações por período (UC06) — exporta JSON ou CSV |

---

## ⚙️ Configuração (`application.properties`)

```properties
# Banco H2 em memória (dev)
spring.datasource.url=jdbc:h2:mem:gac;DB_CLOSE_DELAY=-1

# JWT
gac.jwt.secret=<chave-secreta-min-32-chars>
gac.jwt.expiration-ms=86400000        # 24 horas

# Job de expiração de reservas (RN11)
gac.scheduler.expire-reservations-ms=3600000   # a cada 1 hora

# Swagger
springdoc.swagger-ui.path=/swagger-ui.html
```

---

## 👨‍💻 Desenvolvedores

- Pedro Alberto
- Breno Oliveira
- Gabriel Vieira
- João Pedro

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos — CCT/UNIFOR.
