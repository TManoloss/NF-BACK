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

      return orcamentoCriado; // Retorna o orçamento com os produtos e cliente
    } catch (error) {
      console.error("Erro ao criar orçamento:", error);
      throw new Error("Erro ao criar orçamento");
    }
  }

  static async listarOrcamentos() {
    return await prisma.orcamento.findMany({
      include: { produtos: true, cliente: true }, // Usando o nome correto do relacionamento
    });
  }

  static async buscarOrcamentoPorId(id: number | string) {
    return await prisma.orcamento.findUnique({
      where: { id: Number(id) }, // Convertendo para número
      include: { produtos: true, cliente: true },
    });
  }

  static async deletarOrcamento(id: number | string) {
    return await prisma.orcamento.delete({
      where: { id: Number(id) }, // Convertendo para número
    });
  }
}
