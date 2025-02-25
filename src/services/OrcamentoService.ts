import { prisma } from "../config/database"; 


export class OrcamentoService {
  static async criarOrcamento(data: {
    descricao: string;
    servico: string;
    quantidade: number;
    data_vencimento?: Date;
    endereco: string;
    cliente_id: number;
    produtos: Array<{
      descricao: string;
      servico: string;
      quantidade: number;
      categoria?: string;
      status?: string;
    }>;
  }) {
    try {
      console.log("📌 Criando orçamento...");

      // Valida se há produtos
      if (!data.produtos || data.produtos.length === 0) {
        console.error("❌ Erro: O orçamento deve ter pelo menos um produto.");
        throw new Error("O orçamento deve ter pelo menos um produto."); // Erro específico
      }

      // Cria o orçamento
      const orcamento = await prisma.orcamento.create({
        data: {
          descricao: data.descricao,
          servico: data.servico,
          quantidade: data.quantidade,
          data_vencimento: data.data_vencimento,
          endereco: data.endereco,
          cliente_id: data.cliente_id,
          produtos: {
            create: data.produtos,
          },
        },
        include: { produtos: true },
      });

      console.log(`✅ Orçamento criado com sucesso! ID: ${orcamento.id}`);
      return orcamento;
    } catch (error) {
      console.error("❌ Erro ao criar orçamento:", error);
      throw error; // Lança o erro original
    }
  }



  static async listarOrcamentos() {
    try {
      const orcamentos = await prisma.orcamento.findMany({
        include: { produtos: true, cliente: true },
      });

      console.log(`📋 Listando ${orcamentos.length} orçamento(s).`);
      return orcamentos;
    } catch (error) {
      console.error("❌ Erro ao listar orçamentos:", error);
      throw new Error("Erro ao listar orçamentos");
    }
  }

  static async buscarOrcamentoPorId(id: number | string) {
    try {
      const orcamento = await prisma.orcamento.findUnique({
        where: { id: Number(id) },
        include: { produtos: true, cliente: true },
      });

      if (orcamento) {
        console.log("🔍 Orçamento encontrado:", orcamento);
      } else {
        console.log(`⚠ Orçamento com ID ${id} não encontrado.`);
      }

      return orcamento;
    } catch (error) {
      console.error("❌ Erro ao buscar orçamento por ID:", error);
      throw new Error("Erro ao buscar orçamento");
    }
  }


  static async deletarOrcamento(id: number | string) {
    try {
      const orcamentoDeletado = await prisma.orcamento.delete({
        where: { id: Number(id) },
      });

      console.log(`🗑 Orçamento com ID ${id} deletado com sucesso.`);
      return orcamentoDeletado;
    } catch (error) {
      console.error(`❌ Erro ao deletar orçamento com ID ${id}:`, error);
      throw new Error("Erro ao deletar orçamento");
    }
  }
}
