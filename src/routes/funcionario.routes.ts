import { Router } from 'express';
import { FuncionarioController } from '../controllers/FuncionarioController';

const router = Router();

router.post('/funcionarios', (req, res, next) => {
  // Chame a função passando o req.body
  FuncionarioController.criarFuncionario(req, res, next);
});

router.get('/funcionarios', FuncionarioController.listarFuncionarios);

export default router;
