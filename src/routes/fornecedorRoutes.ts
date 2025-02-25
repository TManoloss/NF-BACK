import { Router } from "express";
import { FornecedorController } from "../controllers/FornecedorController";

const router = Router();

router.post("/fornecedores",(req, res, next) => { FornecedorController.criarFornecedor(req, res)});
router.get("/fornecedores",(req, res, next) => { FornecedorController.listarFornecedores(req, res)});
router.get("/fornecedores/:id",(req, res, next) => { FornecedorController.buscarFornecedorPorId(req, res)});
router.put("/fornecedores/:id",(req, res, next) => { FornecedorController.atualizarFornecedor(req, res)});
router.delete("/fornecedores/:id",(req, res, next) => { FornecedorController.deletarFornecedor(req, res)});

export default router;
