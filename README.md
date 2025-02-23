# 📌 Sistema de Gestão Porto Rico

Este projeto é uma API para gerenciamento de orçamentos, clientes e produtos, utilizando **Node.js**, **Express**, **Prisma** e **PostgreSQL** com **Docker**.

## 🚀 Como rodar o projeto

### 1️⃣ **Clone o repositório**

```sh
git clone https://github.com/TManoloss/NF-BACK.git
cd NF-BACK
```

### 2️⃣ **Suba o banco de dados com Docker**

Se você ainda não tem o PostgreSQL rodando, utilize Docker:

```sh
docker-compose up -d
```

> **Nota:** Certifique-se de que o arquivo `docker-compose.yml` esteja configurado corretamente para rodar o PostgreSQL.

### 3️⃣ **Instale as dependências**

```sh
npm install
```

### 4️⃣ **Configure o banco de dados**

Crie um arquivo **.env** na raiz do projeto e configure a variável de conexão do Prisma com o banco de dados:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### 5️⃣ **Execute as migrações do Prisma**

```sh
npx prisma migrate dev --name init
```

### 6️⃣ **Inicie a API**

```sh
npm run dev
```

A API estará rodando em **[http://localhost:5000](http://localhost:5000)**.

---

## 🛠 **Principais Tecnologias**

- **Node.js** + **Express** (Backend)
- **Prisma ORM**
- **PostgreSQL** (Banco de Dados)
- **Docker** (Banco de Dados Containerizado)
- **TypeScript** (Tipagem e Segurança)

## 📜 **Licença**

Este projeto está sob a licença **MIT**.

