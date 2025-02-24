import { Request, Response } from "express";
import MaterialService from "../services/MaterialService";
import Logger from "../utils/logger";

class MaterialController {
  async listarMateriais(req: Request, res: Response) {
    try {
      const materiais = await MaterialService.listarMateriais();
      res.json(materiais);
    } catch (error) {
      Logger.error("Erro ao listar materiais", error);
      res.status(500).json({ message: "Erro ao listar materiais" });
    }
  }

  async obterMaterialPorId(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const material = await MaterialService.obterMaterialPorId(Number(id));
      if (!material) {
        return res.status(404).json({ message: "Material não encontrado" });
      }
      res.json(material);
    } catch (error) {
      Logger.error(`Erro ao buscar material com ID ${id}`, error);
      res.status(500).json({ message: "Erro ao buscar material" });
    }
  }

  async criarMaterial(req: Request, res: Response) {
    const { descricao, fornecedorId } = req.body;
    try {
      const material = await MaterialService.criarMaterial(descricao, fornecedorId);
      res.status(201).json(material);
    } catch (error) {
      Logger.error("Erro ao criar material", error);
      res.status(500).json({ message: "Erro ao criar material" });
    }
  }

  async atualizarMaterial(req: Request, res: Response) {
    const { id } = req.params;
    const { descricao, fornecedorId } = req.body;
    try {
      const material = await MaterialService.atualizarMaterial(Number(id), descricao, fornecedorId);
      res.json(material);
    } catch (error) {
      Logger.error(`Erro ao atualizar material com ID ${id}`, error);
      res.status(500).json({ message: "Erro ao atualizar material" });
    }
  }

  async deletarMaterial(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await MaterialService.deletarMaterial(Number(id));
      res.status(204).send();
    } catch (error) {
      Logger.error(`Erro ao deletar material com ID ${id}`, error);
      res.status(500).json({ message: "Erro ao deletar material" });
    }
  }
}

export default new MaterialController();
