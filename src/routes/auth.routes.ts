import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/login", (req, res, next) => {
  AuthController.login(req, res).catch(next);
});

export default router;
