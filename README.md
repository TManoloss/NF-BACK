# 📌 Sistema de Gestão Porto Rico

Este projeto é uma API para gerenciamento de orçamentos, clientes e produtos, utilizando **Node.js**, **Express**, **Prisma** e **PostgreSQL** com **Docker**.

## 🚀 Como rodar o projeto

### 1️⃣ **Clone o repositório**

```bash
git clone https://github.com/TManoloss/NF-BACK.git
cd NF-BACK
```

### 2️⃣ **Suba o banco de dados com Docker**

Se você ainda não tem o PostgreSQL rodando, utilize Docker:

```bash
docker-compose up -d
```

> **Nota:** Certifique-se de que o arquivo `docker-compose.yml` esteja configurado corretamente para rodar o PostgreSQL.

### 3️⃣ **Instale as dependências**

```bash
npm install
```

### 4️⃣ **Configure o banco de dados**

Crie um arquivo **.env** na raiz do projeto e configure a variável de conexão do Prisma com o banco de dados:

```env
DATABASE_URL="postgresql://admin:secret@localhost:5432/meu_banco"
```

### 5️⃣ **Execute as migrações do Prisma**

```bash
npx prisma migrate dev --name init
```

### 6️⃣ **Inicie a API**

```bash
npx ts-node src/server.ts
```

A API estará rodando em **[http://localhost:5000](http://localhost:5000)**.

## 🛠 **Principais Tecnologias**

- **Node.js** + **Express** (Backend)
- **Prisma ORM**
- **PostgreSQL** (Banco de Dados)
- **Docker** (Banco de Dados Containerizado)
- **TypeScript** (Tipagem e Segurança)

## 📜 **Endpoints da API**

### 1. **Clientes**

- **Criar Cliente**
  - **URL:** `POST /api/clientes`
  - **Exemplo de corpo da requisição:**
    ```json
    {
      "nome": "João Silva",
      "email": "joao.silva@email.com",
      "telefone": "11999999999",
      "endereco": "Rua das Flores, 123",
      "cpf": "12345678900"
    }
    ```

- **Listar Clientes**
  - **URL:** `GET /api/clientes`

- **Buscar Cliente por ID**
  - **URL:** `GET /api/clientes/:id`
  - **Exemplo:** `GET /api/clientes/1`

- **Deletar Cliente**
  - **URL:** `DELETE /api/clientes/:id`
  - **Exemplo:** `DELETE /api/clientes/1`

### 2. **Materiais**

- **Criar Material**
  - **URL:** `POST /api/materiais`
  - **Exemplo de corpo da requisição:**
    ```json
    {
      "descricao": "Material de Construção",
      "produtoId": 1,
      "fornecedorId": 1
    }
    ```

- **Listar Materiais**
  - **URL:** `GET /api/materiais`

- **Buscar Material por ID**
  - **URL:** `GET /api/materiais/:id`
  - **Exemplo:** `GET /api/materiais/1`

- **Deletar Material**
  - **URL:** `DELETE /api/materiais/:id`
  - **Exemplo:** `DELETE /api/materiais/1`

### 3. **Orçamentos**

- **Criar Orçamento**
  - **URL:** `POST /api/orcamentos`
  - **Exemplo de corpo da requisição:**
    ```json
    {
      "descricao": "Orçamento para reforma",
      "servico": "Reforma de casa",
      "quantidade": 1,
      "data_vencimento": "2023-12-31",
      "endereco": "Rua das Flores, 123",
      "cliente_id": 1,
      "produtos": [
        {
          "descricao": "Cimento",
          "servico": "Material",
          "quantidade": 10
        }
      ]
    }
    ```

- **Listar Orçamentos**
  - **URL:** `GET /api/orcamentos`

- **Buscar Orçamento por ID**
  - **URL:** `GET /api/orcamentos/:id`
  - **Exemplo:** `GET /api/orcamentos/1`

- **Deletar Orçamento**
  - **URL:** `DELETE /api/orcamentos/:id`
  - **Exemplo:** `DELETE /api/orcamentos/1`

## 📄 **Licença**

Este projeto está sob a licença **MIT**.

## 🏗 **Padrões de Projeto Utilizados**

### 1. Padrões Criacionais

Os padrões criacionais tratam da criação de objetos de forma que a criação seja independente do sistema que os utiliza. Um exemplo no seu código é o uso do **Factory Method** na classe `ClienteService`, onde você cria instâncias de `Cliente` através do Prisma.

**Exemplo:**
```typescript
// src/services/ClienteService.ts
const clienteCriado = await prisma.cliente.create({
  data: { nome, email, telefone, endereco, cpf },
});
```

### 2. Padrões Estruturais

Os padrões estruturais tratam da composição de classes e objetos para formar estruturas maiores. Um exemplo no seu código é o uso do **Facade**, onde a classe `ClienteController` atua como uma fachada para o `ClienteService`, simplificando a interação com os serviços.

**Exemplo:**
```typescript
// src/controllers/ClienteController.ts
const cliente = await ClienteService.criarCliente(nome, email, telefone, endereco, cpf);
```

### 3. Padrões Comportamentais

Os padrões comportamentais tratam da interação entre objetos. Um exemplo no seu código é o uso do **Observer**, que pode ser visto na forma como os serviços e controladores interagem. Por exemplo, quando um cliente é criado, o `ClienteController` notifica o `ClienteService` para realizar a ação.

**Exemplo:**
```typescript
// src/controllers/ClienteController.ts
const clientes = await ClienteService.listarClientes();
```


## 🏗 **Padrões de Projeto Utilizados**

### 1. Padrões Criacionais

Os padrões criacionais tratam da criação de objetos de forma que a criação seja independente do sistema que os utiliza. Um exemplo no seu código é o uso do **Factory Method** na classe `ClienteService`, onde você cria instâncias de `Cliente` através do Prisma.

**Exemplo:**
```typescript
// src/services/ClienteService.ts
const clienteCriado = await prisma.cliente.create({
  data: { nome, email, telefone, endereco, cpf },
});
```

### 2. Padrões Estruturais

Os padrões estruturais tratam da composição de classes e objetos para formar estruturas maiores. Um exemplo no seu código é o uso do **Facade**, onde a classe `ClienteController` atua como uma fachada para o `ClienteService`, simplificando a interação com os serviços.

**Exemplo:**
```typescript
// src/controllers/ClienteController.ts
const cliente = await ClienteService.criarCliente(nome, email, telefone, endereco, cpf);
```

### 3. Padrões Comportamentais

Os padrões comportamentais tratam da interação entre objetos. Um exemplo no seu código é o uso do **Observer**, que pode ser visto na forma como os serviços e controladores interagem. Por exemplo, quando um cliente é criado, o `ClienteController` notifica o `ClienteService` para realizar a ação.

**Exemplo:**
```typescript
// src/controllers/ClienteController.ts
const clientes = await ClienteService.listarClientes();
```