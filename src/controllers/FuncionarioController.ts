import { FuncionarioService } from '../services/FuncionarioService';  // Certifique-se de que a importação está correta
import { Request, Response, NextFunction } from 'express'; // Certifique-se de importar os tipos

export class FuncionarioController {
  static async criarFuncionario(
    req: Request, // Especificando o tipo para req
    res: Response, // Especificando o tipo para res
    next: NextFunction // Especificando o tipo para next
  ) {
    try {
      const { nome, email, endereco, telefone, cpf, senha } = req.body;
      const funcionario = await FuncionarioService.criarFuncionario(
        nome,
        email,
        endereco,
        telefone,
        cpf,
        senha
      );
      res.status(201).json(funcionario);
      console.log(`Funcionario ${nome} criado`)
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento
    }
    
  }

  static async listarFuncionarios(
    req: Request, // Especificando o tipo para req
    res: Response, // Especificando o tipo para res
    next: NextFunction // Especificando o tipo para next
  ) {
    try {
      const funcionarios = await FuncionarioService.listarFuncionarios();
      res.status(200).json(funcionarios);
    } catch (error) {
      next(error); // Passa o erro para o middleware de tratamento
    }
  }
}
