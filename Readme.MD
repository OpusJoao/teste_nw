# 📝 Projeto TODO List Full Stack

Este projeto é uma aplicação **full stack** construída com:

- ✅ **Next.js** (frontend)
- ✅ **NestJS** (backend)
- ✅ **PostgreSQL** (banco de dados)
- ✅ **TypeORM** (ORM no backend)
- ✅ **NextAuth** (autenticação)
- ✅ **Tailwind CSS** (estilização)
- ✅ **Docker Compose** (para o banco)

---

## 🚀 Funcionalidades

### Frontend

- Página inicial com lista de tarefas (TODO list).
- Login com JWT via NextAuth.
- Página de administração para visualizar todas as tarefas (admin).
- Criação, edição, exclusão e conclusão de tarefas.
- Filtro de tarefas por usuário e status.
- Paginação.
- Página de registro com validação de senha e confirmação.
- Controle de acesso por role (`user` ou `admin`).
- Toasts e loaders bonitos.

### Backend

- API NestJS com CRUD completo de tarefas.
- Autenticação JWT com suporte a **refresh token**.
- Proteção de rotas via guards (`AuthGuard` e `RolesGuard`).
- Role-based access (somente admin pode acessar certas rotas).
- Repository pattern com TypeORM.
- Integração com PostgreSQL.
- Suporte a transações usando `typeorm-transactional`.

---

## 💻 Tecnologias

- **Frontend**: Next.js (v14+), React, Tailwind CSS, Axios, React Hot Toast.
- **Backend**: NestJS, TypeORM, PostgreSQL.
- **Banco de dados**: PostgreSQL.
- **Autenticação**: JWT + NextAuth.
- **Infra**: Docker e Docker Compose.

---

## ⚙️ Setup do projeto

### 🔌 Clonar o repositório

```bash
git clone https://github.com/OpusJoao/teste_nw
cd teste_nw
````

---

### ⚙️ Configurar variáveis de ambiente

#### Frontend

Crie um arquivo `.env` no diretório do frontend:

```env
NEXT_PUBLIC_API_URL=http://host.docker.internal:3001
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="secret"
```

#### Backend

Crie um arquivo `.env` no diretório do backend:

```env
DB_HOST=host.docker.internal
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=root123
DB_NAME=todo
JWT_SECRET=sua_chave_jwt
JWT_EXPIRES_IN=360s
JWT_REFRESH_EXPIRES_IN=7d
```

---

### 🐳 Subir o projeto com Docker

Subir os containers:

```bash
docker-compose up -d
```
---
### 🚀 Aplicação Up!!!
A aplicação estará de pé no link [http://localhost:3000](http://localhost:3000)

---

### 🚀 Rodar o backend

```bash
cd api
npm install
npm run start:dev
```

---

### 💻 Rodar o frontend

```bash
cd front
npm install
npm run dev
```

---

## 🔐 Autenticação

* Login via NextAuth usando JWT.
* Refresh token automático (ao expirar, tenta renovar).
* Usuários podem ser criados via página de registro.
* A role `admin` permite acessar a página `/admin`.

---

## 🛡️ Roles e Guards

* Usuários comuns: podem gerenciar apenas suas próprias tarefas.
* Admin: podem visualizar todas as tarefas, filtrar por usuário/status.

---

## 📄 Estrutura dos diretórios

```
/api          → Backend NestJS
/web          → Frontend Next.js
/docker-compose.yml → Banco Postgres, api, front
```

---

## 🛠️ Comandos úteis

### Backend

* `npm run start:dev` → start em modo desenvolvimento
* `npm run build` → build do backend
* `npm run start:prod` → start em produção

### Frontend

* `npm run dev` → start em modo desenvolvimento
* `npm run build` → build do frontend
* `npm run start` → start em produção

---

## 🎨 Telas

### ✅ Lista de tarefas

* Visualizar, criar, editar, excluir, concluir.

### 🔒 Login

* Formulário com username e senha.

### 🆕 Registro

* Validação forte de senha (mínimo 6 caracteres, número, maiúscula, minúscula, confirmação).

### 👨‍💼 Admin

* Tabela de tarefas com filtros por usuário e status.
* Paginação.

---

## 💬 Contribuição

Contribuições são muito bem-vindas! Sinta-se à vontade para abrir issues ou enviar PRs.

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

## 🚀 Contato

Feito com 💙 por [João Ferreira](https://github.com/OpusJoao)

---
