import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrcamentoService {
  static async criarOrcamento(
    descricao: string,
    servico: string,
    quantidade: number,
    data_vencimento: Date,
    endereco: string,
    cliente_id: number | null,
    produtos: {
      descricao: string;
      servico: string;
      quantidade: number;
      categoria?: string;
      status?: string;
    }[]
  ) {
    try {
      const orcamentoCriado = await prisma.orcamento.create({
        data: {
          descricao,
          servico,
          quantidade,
          data_vencimento,
          endereco,
          cliente_id, // Associando cliente ao orçamento
          produtos: {
            create: produtos.map((produto) => ({
              descricao: produto.descricao,
              servico: produto.servico,
              quantidade: produto.quantidade,
              categoria: produto.categoria,
              status: produto.status,
            })),
          },
        },
        include: {
          produtos: true, // Incluir produtos associados
          cliente: true,  // Incluir cliente associado
        },
      });
      console.log("✅ Orçamento criado com sucesso:", orcamentoCriado);
      return orcamentoCriado; // Retorna o orçamento com os produtos e cliente
    } catch (error) {
        console.error("❌ Erro ao criar orçamento:", error);
        throw new Error("Erro ao criar orçamento");
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
