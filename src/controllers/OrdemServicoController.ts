import { Request, Response } from "express";
import { OrdemServicoService } from "../services/OrdemServicoService";

export class OrdemServicoController {
  static async criarOrdemServico(req: Request, res: Response) {
    try {
      const { pedido_id } = req.body;

      if (!pedido_id) {
        console.warn("⚠️ Requisição inválida: pedido_id não fornecido.");
        return res.status(400).json({ error: "O campo pedido_id é obrigatório." });
      }

      const ordemServico = await OrdemServicoService.criarOrdemServico(pedido_id);
      return res.status(201).json(ordemServico);
    } catch (error) {
      console.error("❌ Erro ao criar ordem de serviço:", error);
      return res.status(500).json({ error: "Erro ao criar ordem de serviço." });
    }
  }

  static async listarOrdensServico(req: Request, res: Response) {
    try {
      const ordensServico = await OrdemServicoService.listarOrdensServico();
      return res.status(200).json(ordensServico);
    } catch (error) {
      console.error("❌ Erro ao listar ordens de serviço:", error);
      return res.status(500).json({ error: "Erro ao listar ordens de serviço." });
    }
  }

  static async buscarOrdemServicoPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const ordemServicoId = parseInt(id);

      if (isNaN(ordemServicoId)) {
        console.warn("⚠️ Ordem de Serviço ID inválido fornecido.");
        return res.status(400).json({ error: "ID inválido." });
      }

      const ordemServico = await OrdemServicoService.buscarOrdemServicoPorId(ordemServicoId);

      if (!ordemServico) {
        console.warn(`⚠️ Ordem de Serviço ID ${ordemServicoId} não encontrada.`);
        return res.status(404).json({ error: "Ordem de Serviço não encontrada." });
      }

      return res.status(200).json(ordemServico);
    } catch (error) {
      console.error(`❌ Erro ao buscar ordem de serviço ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar ordem de serviço." });
    }
  }

  static async atualizarStatusProduto(req: Request, res: Response) {
    try {
      const { ordemServicoId, produtoId } = req.params;
      const { novoStatus } = req.body;

      if (!novoStatus) {
        console.warn("⚠️ Requisição inválida: novoStatus não fornecido.");
        return res.status(400).json({ error: "O campo novoStatus é obrigatório." });
      }

      const produtoAtualizado = await OrdemServicoService.atualizarStatusProduto(
        parseInt(ordemServicoId),
        parseInt(produtoId),
        novoStatus
      );

      return res.status(200).json(produtoAtualizado);
    } catch (error) {
      console.error("❌ Erro ao atualizar status do produto:", error);
      return res.status(500).json({ error: "Erro ao atualizar status do produto." });
    }
  }
}