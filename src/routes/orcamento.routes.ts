import { Router } from "express";
import { OrcamentoController } from "../controllers/OrcamentoController";

const router = Router();

router.post("/orcamentos",(req, res, next) => {OrcamentoController.criarOrcamento(req, res)});
router.get("/orcamentos", (req, res, next) =>{OrcamentoController.listarOrcamentos(req, res)});
router.get("/orcamentos/:id",(req, res, next) => {OrcamentoController.buscarOrcamentoPorId(req, res)});
router.delete("/orcamentos/:id",(req, res, next) => {OrcamentoController.deletarOrcamento(req, res)});

export default router;
