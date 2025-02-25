import { Router } from "express";
import { MaterialController } from "../controllers/MaterialController";

const router = Router();

router.post("/materiais", (req, res, next) => { MaterialController.criarMaterial(req, res)});
router.get("/materiais", (req, res, next) => { MaterialController.listarMateriais(req, res)});
router.get("/materiais/:id", (req, res, next) => { MaterialController.buscarMaterialPorId(req, res)});
router.put("/materiais/:id", (req, res, next) => { MaterialController.atualizarMaterial(req, res)});
router.delete("/materiais/:id", (req, res, next) => { MaterialController.deletarMaterial(req, res)});

export default router;
