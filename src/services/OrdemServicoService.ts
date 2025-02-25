import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrdemServicoService {
  // Criar uma Ordem de Serviço baseada no Pedido
  static async criarOrdemServico(pedidoId: number) {
    const pedido = await prisma.pedido.findUnique({
      where: { id: pedidoId },
      include: { produtos: true },
    });

    if (!pedido) throw new Error("Pedido não encontrado");

    // Criar Ordem de Serviço e vincular produtos
    const ordemServico = await prisma.ordemServico.create({
      data: {
        descricao: `Ordem de Serviço para Pedido ${pedido.numero}`,
        numero_pedido: pedido.id,
        produtos: {
          connect: pedido.produtos.map((p) => ({ id: p.id })),
        },
      },
    });

    return ordemServico;
  }

  // Atualizar status de um produto na OS e salvar histórico
  static async alterarStatusProduto(
    pedidoProdutoId: number,
    novoStatus: string,
    funcionarioId: number
  ) {
    const produtoPedido = await prisma.pedidoProduto.findUnique({
      where: { id: pedidoProdutoId },
    });

    if (!produtoPedido) throw new Error("Produto não encontrado no Pedido");

    const statusAnterior = produtoPedido.status;

    await prisma.$transaction([
      // Atualizar o status do produto no PedidoProduto
      prisma.pedidoProduto.update({
        where: { id: pedidoProdutoId },
        data: { status: novoStatus },
      }),
      // Registrar histórico da mudança de status
      prisma.historicoStatusProduto.create({
        data: {
          pedidoProdutoId,
          funcionarioId,
          statusAnterior,
          statusNovo: novoStatus,
        },
      }),
    ]);

    return { mensagem: "Status atualizado com sucesso" };
  }

  // Listar Ordem de Serviço sem expor endereços nem fornecedores
  static async listarOrdemServico() {
    return prisma.ordemServico.findMany({
      include: {
        pedido: {
          select: {
            id: true,
            numero: true,
            status: true,
            produtos: {
              select: {
                id: true,
                produto: {
                  select: {
                    descricao: true,
                    categoria: true,
                    status: true,
                    materiais: {
                      select: {
                        material: {
                          select: { descricao: true },
                        },
                        quantidade: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
