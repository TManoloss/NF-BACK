import { Router } from "express";
import {PedidoController} from "../controllers/PedidoController";

const router = Router();

router.get("/",(req, res, next) =>  {PedidoController.listarPedidos(req, res)});
router.post("/",(req, res, next) =>  {PedidoController.criarPedido(req, res)});
// Buscar um pedido por ID
router.get("/:id",(req, res, next) =>  {PedidoController.buscarPedidoPorId(req, res)});

// Deletar um pedido por ID
router.delete("/:id",(req, res, next) =>  {PedidoController.deletarPedido(req, res)});
export default router;
