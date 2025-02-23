import { Request, Response } from "express";
import { OrcamentoService } from "../services/OrcamentoService";

export class OrcamentoController {
  static async criarOrcamento(req: Request, res: Response) {
    try {
      const { descricao, servico, quantidade, data_vencimento, endereco, cliente_id, produtos } = req.body;

      if (!descricao || !servico || !endereco || !produtos || produtos.length === 0) {
        return res.status(400).json({ message: "Dados incompletos" });
      }

      const orcamento = await OrcamentoService.criarOrcamento(
        descricao,
        servico,
        quantidade,
        new Date(data_vencimento),
        endereco,
        cliente_id,
        produtos
      );

      return res.status(201).json(orcamento);
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async listarOrcamentos(req: Request, res: Response) {
    try {
      const orcamentos = await OrcamentoService.listarOrcamentos();
      return res.status(200).json(orcamentos);
    } catch (error) {
      console.error("Erro ao listar orçamentos:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async buscarOrcamentoPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orcamento = await OrcamentoService.buscarOrcamentoPorId(Number(id));

      if (!orcamento) {
        return res.status(404).json({ message: "Orçamento não encontrado" });
      }

      return res.status(200).json(orcamento);
    } catch (error) {
      console.error("Erro ao buscar orçamento:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }

  static async deletarOrcamento(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await OrcamentoService.deletarOrcamento(Number(id));
      return res.status(200).json({ message: "Orçamento deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar orçamento:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }
}
