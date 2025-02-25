import express from "express";
import authRoutes from "./routes/auth.routes"; // Verifique se está importando corretamente
import funcionarioRoutes from './routes/funcionario.routes';
import clienteRoutes from "./routes/cliente.routes";
import orcamentoRoutes from "./routes/orcamento.routes";
import cors from "cors";
import pedidoRoutes from "./routes/pedido.routes";
import materialRoutes from "./routes/material.routes";
import Logger from "./utils/logger";
import fornecedorRoutes from "./routes/fornecedorRoutes";
import ordemServicoRoutes from "./routes/ordemServico.routes"

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
// Middleware para ler o corpo da requisição em formato JSON
app.use(express.json());
// Usando o roteador de autenticação
app.use("/auth", authRoutes); // Isso vai garantir que as rotas sejam registradas corretamente
app.use("/pedidos", pedidoRoutes); // <- Certifique-se de que "/pedidos" está sendo usado
app.use('/api', funcionarioRoutes);
app.use(orcamentoRoutes);
app.use(clienteRoutes);
app.use(materialRoutes);
app.use(fornecedorRoutes);
app.use("/ordem-servico", ordemServicoRoutes);
const PORT = 5000;
const server = app.listen(PORT, () => {
  Logger.info(`🔥 Servidor rodando na porta ${PORT}`);
});
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Servidor encerrado');
    process.exit(0);
  });
});
app.use((req, res, next) => {
  console.log(`Requisição recebida: ${req.method} ${req.url}`);
  next();
});

