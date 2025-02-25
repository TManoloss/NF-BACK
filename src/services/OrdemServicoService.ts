import { prisma } from "../config/database"; 

export class OrdemServicoService {
  static async criarOrdemServico(pedido_id: number) {
    try {
      console.log(`📌 Criando ordem de serviço para pedido ID: ${pedido_id}`);

      // Verifica se o pedido existe
      const pedido = await prisma.pedido.findUnique({
        where: { id: pedido_id },
        include: { produtos: true },
      });

      if (!pedido) {
        console.error(`❌ Erro: Pedido ID ${pedido_id} não encontrado.`);
        throw new Error("Pedido não encontrado.");
      }

      // Cria a ordem de serviço com os produtos do pedido
      const ordemServicoCriada = await prisma.ordemServico.create({
        data: {
          descricao: `Ordem de Serviço para Pedido ${pedido.numero}`,
          numero_pedido: pedido_id,
          produtos: {
            connect: pedido.produtos.map((produto) => ({
              id: produto.id,
            })),
          },
        },
        include: { produtos: true },
      });

      console.log(`✅ Ordem de Serviço criada com sucesso! ID: ${ordemServicoCriada.id}`);
      return ordemServicoCriada;
    } catch (error) {
      console.error("❌ Erro ao criar ordem de serviço:", error);
      throw new Error("Erro ao criar ordem de serviço");
    }
  }

  static async listarOrdensServico() {
    try {
      console.log("📌 Listando todas as ordens de serviço...");
      const ordensServico = await prisma.ordemServico.findMany({
        include: {
          pedido: {
            include: { orcamento: { include: { cliente: true } } },
          },
          produtos: {
            include: { produto: { include: { materiais: true } } },
          },
        },
      });

      console.log(`✅ ${ordensServico.length} ordem(ns) de serviço encontrada(s).`);
      return ordensServico;
    } catch (error) {
      console.error("❌ Erro ao listar ordens de serviço:", error);
      throw new Error("Erro ao listar ordens de serviço");
    }
  }

  static async buscarOrdemServicoPorId(id: number) {
    try {
      console.log(`📌 Buscando ordem de serviço ID: ${id}`);

      const ordemServico = await prisma.ordemServico.findUnique({
        where: { id },
        include: {
          pedido: {
            include: { orcamento: { include: { cliente: true } } },
          },
          produtos: {
            include: { produto: { include: { materiais: true } } },
          },
        },
      });

      if (!ordemServico) {
        console.warn(`⚠️ Ordem de Serviço ID ${id} não encontrada.`);
        return null;
      }

      console.log(`✅ Ordem de Serviço encontrada: ID ${ordemServico.id}`);
      return ordemServico;
    } catch (error) {
      console.error(`❌ Erro ao buscar ordem de serviço ID ${id}:`, error);
      throw new Error("Erro ao buscar ordem de serviço");
    }
  }

  static async atualizarStatusProduto(
    ordemServicoId: number,
    produtoId: number,
    novoStatus: string
  ) {
    try {
      console.log(
        `📌 Atualizando status do produto ID ${produtoId} na ordem de serviço ID ${ordemServicoId}`
      );

      const ordemServico = await prisma.ordemServico.findUnique({
        where: { id: ordemServicoId },
        include: { produtos: true },
      });

      if (!ordemServico) {
        console.error(`❌ Erro: Ordem de Serviço ID ${ordemServicoId} não encontrada.`);
        throw new Error("Ordem de Serviço não encontrada.");
      }

      const produto = ordemServico.produtos.find((p) => p.id === produtoId);
      if (!produto) {
        console.error(`❌ Erro: Produto ID ${produtoId} não encontrado na ordem de serviço.`);
        throw new Error("Produto não encontrado na ordem de serviço.");
      }

      const produtoAtualizado = await prisma.pedidoProduto.update({
        where: { id: produtoId },
        data: { status: novoStatus },
      });

      console.log(`✅ Status do produto ID ${produtoId} atualizado para: ${novoStatus}`);
      return produtoAtualizado;
    } catch (error) {
      console.error("❌ Erro ao atualizar status do produto:", error);
      throw new Error("Erro ao atualizar status do produto");
    }
  }
}