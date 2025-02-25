import { Router } from "express";
import { OrdemServicoController } from "../controllers/OrdemServicoController";

const router = Router();

router.post("/", (req, res, next) => {OrdemServicoController.criarOrdemServico(req, res)});
router.get("/", (req, res) => {OrdemServicoController.listarOrdensServico(req, res)});
router.get("/:id", (req, res) => {OrdemServicoController.buscarOrdemServicoPorId(req, res)});
router.put("/:ordemServicoId/produtos/:produtoId", (req, res) =>
  {OrdemServicoController.atualizarStatusProduto(req, res)}
);

export default router;