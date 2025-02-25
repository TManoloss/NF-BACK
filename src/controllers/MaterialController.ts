import { Request, Response } from "express";
import { MaterialService } from "../services/MaterialService";

export class MaterialController {
  static async criarMaterial(req: Request, res: Response) {
    try {
      const { descricao, produto, fornecedorId } = req.body;

      if (!descricao || !produto || !fornecedorId) {
        return res.status(400).json({ erro: "Descrição, produto e fornecedor são obrigatórios" });
      }

      const material = await MaterialService.criarMaterial(descricao, produto, fornecedorId);
      return res.status(201).json(material);
    } catch (error) {
      console.error("Erro ao criar material:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async listarMateriais(req: Request, res: Response) {
    try {
      const materiais = await MaterialService.listarMateriais();
      return res.json(materiais);
    } catch (error) {
      console.error("Erro ao listar materiais:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async buscarMaterialPorId(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const material = await MaterialService.buscarMaterialPorId(id);
      if (!material) {
        return res.status(404).json({ erro: "Material não encontrado" });
      }
      return res.json(material);
    } catch (error) {
      console.error("Erro ao buscar material:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async atualizarMaterial(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const material = await MaterialService.atualizarMaterial(id, req.body);
      return res.json(material);
    } catch (error) {
      console.error("Erro ao atualizar material:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }

  static async deletarMaterial(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await MaterialService.deletarMaterial(id);
      return res.json({ mensagem: "Material deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar material:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
}
