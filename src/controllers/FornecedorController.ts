import { Request, Response } from "express";
import { FornecedorService } from "../services/FornecedorService";

export class FornecedorController {
  static async criarFornecedor(req: Request, res: Response) {
    try {
      const { nome, email, endereco, telefone, cnpj } = req.body;
      const fornecedor = await FornecedorService.criarFornecedor(nome, email, endereco, telefone, cnpj);
      return res.status(201).json(fornecedor);
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async listarFornecedores(req: Request, res: Response) {
    try {
      const fornecedores = await FornecedorService.listarFornecedores();
      return res.json(fornecedores);
    } catch (error) {
      console.error("Erro ao listar fornecedores:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async buscarFornecedorPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const fornecedor = await FornecedorService.buscarFornecedorPorId(id);
      if (!fornecedor) {
        return res.status(404).json({ erro: "Fornecedor não encontrado" });
      }
      return res.json(fornecedor);
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async atualizarFornecedor(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const fornecedor = await FornecedorService.atualizarFornecedor(id, req.body);
      return res.json(fornecedor);
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async deletarFornecedor(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await FornecedorService.deletarFornecedor(id);
      return res.json({ mensagem: "Fornecedor deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
}
