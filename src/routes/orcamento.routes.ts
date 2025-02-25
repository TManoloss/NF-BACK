import { Router } from "express";
import { OrcamentoController } from "../controllers/OrcamentoController";

const router = Router();

router.post("/",(req, res, next) => {OrcamentoController.criarOrcamento(req, res)});
router.get("/", (req, res, next) =>{OrcamentoController.listarOrcamentos(req, res)});
router.get("/:id",(req, res, next) => {OrcamentoController.buscarOrcamentoPorId(req, res)});
router.delete("/:id",(req, res, next) => {OrcamentoController.deletarOrcamento(req, res)});

export default router;
