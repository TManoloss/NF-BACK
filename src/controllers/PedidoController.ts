import { Request, Response } from "express";
import { PedidoService } from "../services/PedidoService";

export class PedidoController {
  static async criarPedido(req: Request, res: Response) {
    try {
      const { orcamento_id } = req.body;

      if (!orcamento_id) {
        console.warn("⚠️ Requisição inválida: orcamento_id não fornecido.");
        return res.status(400).json({ error: "O campo orcamento_id é obrigatório." });
      }

      const pedido = await PedidoService.criarPedido(orcamento_id);
      return res.status(201).json(pedido);
    } catch (error) {
      console.error("❌ Erro ao criar pedido:", error);
      return res.status(500).json({ error: "Erro ao criar pedido." });
    }
  }

  static async listarPedidos(req: Request, res: Response) {
    try {
      const pedidos = await PedidoService.listarPedidos();
      return res.status(200).json(pedidos);
    } catch (error) {
      console.error("❌ Erro ao listar pedidos:", error);
      return res.status(500).json({ error: "Erro ao listar pedidos." });
    }
  }

  static async buscarPedidoPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pedidoId = parseInt(id);

      if (isNaN(pedidoId)) {
        console.warn("⚠️ Pedido ID inválido fornecido.");
        return res.status(400).json({ error: "ID inválido." });
      }

      const pedido = await PedidoService.buscarPedidoPorId(pedidoId);

      if (!pedido) {
        console.warn(`⚠️ Pedido ID ${pedidoId} não encontrado.`);
        return res.status(404).json({ error: "Pedido não encontrado." });
      }

      return res.status(200).json(pedido);
    } catch (error) {
      console.error(`❌ Erro ao buscar pedido ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao buscar pedido." });
    }
  }

  static async deletarPedido(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pedidoId = parseInt(id);

      if (isNaN(pedidoId)) {
        console.warn("⚠️ Pedido ID inválido fornecido.");
        return res.status(400).json({ error: "ID inválido." });
      }

      await PedidoService.deletarPedido(pedidoId);
      return res.status(200).json({ message: "Pedido deletado com sucesso." });
    } catch (error) {
      console.error(`❌ Erro ao deletar pedido ID ${req.params.id}:`, error);
      return res.status(500).json({ error: "Erro ao deletar pedido." });
    }
  }
}
