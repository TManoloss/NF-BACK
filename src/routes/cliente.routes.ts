import express from 'express';
import { ClienteController } from "../controllers/ClienteController";
const router = express.Router();

router.post('/clientes', (req, res, next) => {
    ClienteController.criarCliente(req, res);
  });
router.get('/clientes', (req, res, next)=>{
    ClienteController.listarClientes(req,res)
});
router.get('/clientes/:id', (req, res, next) => {
    ClienteController.buscarClientePorId(req,res)
})
router.get("/cliente/buscar", (req, res) => {
    ClienteController.buscarClientePorNome(req, res);
  });
  
router.delete('/clientes/:id', (req, res, next) => {
    ClienteController.deletarCliente(req, res);
})

export default router;