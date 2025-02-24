import { Router } from "express";
import MaterialController from "../controllers/MaterialController";

const router = Router();

router.get("/", MaterialController.listarMateriais);
router.get("/:id",(req, res, next) => {MaterialController.obterMaterialPorId(req, res)});
router.post("/", MaterialController.criarMaterial);
router.put("/:id", MaterialController.atualizarMaterial);
router.delete("/:id", MaterialController.deletarMaterial);

export default router;
