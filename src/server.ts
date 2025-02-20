import express from "express";
import authRoutes from "./routes/auth.routes"; // Verifique se está importando corretamente
import funcionarioRoutes from './routes/funcionario.routes';
import clienteRoutes from "./routes/cliente.routes";


const app = express();

// Middleware para ler o corpo da requisição em formato JSON
app.use(express.json());

// Usando o roteador de autenticação
app.use("/auth", authRoutes); // Isso vai garantir que as rotas sejam registradas corretamente

app.use('/api', funcionarioRoutes);

app.use(clienteRoutes);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor rodando na porta ${PORT}`);
});
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

