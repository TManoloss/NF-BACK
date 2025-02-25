import { prisma } from "../config/database"; 


export class PedidoService {
  static async criarPedido(orcamento_id: number) {
    try {
      console.log(`📌 Criando pedido para orçamento ID: ${orcamento_id}`);

      // Verifica se o orçamento existe
      const orcamento = await prisma.orcamento.findUnique({
        where: { id: orcamento_id },
        include: { produtos: true },
      });

      if (!orcamento) {
        console.error(`❌ Erro: Orçamento ID ${orcamento_id} não encontrado.`);
        throw new Error("Orçamento não encontrado.");
      }

      // Criando pedido com os produtos do orçamento
      const pedidoCriado = await prisma.pedido.create({
        data: {
          numero: `PED-${Date.now()}`,
          status: "Pendente",
          orcamento_id,
          produtos: {
            create: orcamento.produtos.map((produto) => ({
              produto: { connect: { id: produto.id } } // Conectando o produto existente
            }))
          }
        },
        include: { produtos: true },
      });

      console.log(`✅ Pedido criado com sucesso! ID: ${pedidoCriado.id}`);
      return pedidoCriado;
    } catch (error) {
      console.error("❌ Erro ao criar pedido:", error);
      throw new Error("Erro ao criar pedido");
    }
  }

  static async listarPedidos() {
    try {
      console.log("📌 Listando todos os pedidos...");
      const pedidos = await prisma.pedido.findMany({
        include: {
          orcamento: {
            include: { cliente: true },
          },
          produtos: {
            include: { produto: { include: { materiais: true } } },
          },
        },
      });

      console.log(`✅ ${pedidos.length} pedido(s) encontrado(s).`);
      return pedidos;
    } catch (error) {
      console.error("❌ Erro ao listar pedidos:", error);
      throw new Error("Erro ao listar pedidos");
    }
  }

  static async buscarPedidoPorId(id: number) {
    try {
      console.log(`📌 Buscando pedido ID: ${id}`);

      const pedido = await prisma.pedido.findUnique({
        where: { id },
        include: {
          orcamento: {
            include: { cliente: true },
          },
          produtos: {
            include: { produto: { include: { materiais: true } } },
          },
        },
      });

      if (!pedido) {
        console.warn(`⚠️ Pedido ID ${id} não encontrado.`);
        return null;
      }

      console.log(`✅ Pedido encontrado: ID ${pedido.id}`);
      return pedido;
    } catch (error) {
      console.error(`❌ Erro ao buscar pedido ID ${id}:`, error);
      throw new Error("Erro ao buscar pedido");
    }
  }

  static async deletarPedido(id: number) {
    try {
      console.log(`📌 Deletando pedido ID: ${id}`);
      
      await prisma.pedido.delete({ where: { id } });

      console.log(`✅ Pedido ID ${id} deletado com sucesso.`);
      return { message: "Pedido deletado com sucesso." };
    } catch (error) {
      console.error(`❌ Erro ao deletar pedido ID ${id}:`, error);
      throw new Error("Erro ao deletar pedido");
    }
  }
}
