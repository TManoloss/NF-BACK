// src/tests/OrdemServicoService.test.ts

// Coloque o jest.mock no topo, antes dos imports, para garantir que o módulo seja mockado.
jest.mock("../config/database", () => {
  return {
    prisma: {
      orcamento: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      pedido: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      ordemServico: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      pedidoProduto: {
        update: jest.fn(),
      },
    },
  };
});

import { prisma } from "../config/database";
import { OrdemServicoService } from "../services/OrdemServicoService";

describe("OrdemServicoService - atualizarStatusProduto", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve atualizar o status de um produto corretamente, simulando o fluxo completo", async () => {
    // 1. Simule a criação do Orçamento (seu fluxo completo, se necessário)
    const orcamentoMock = {
      id: 8,
      descricao: "Orçamento de reforma",
      servico: "Pintura",
      quantidade: 10,
      data_vencimento: "2025-03-01T00:00:00.000Z",
      endereco: "Rua Exemplo, 123",
      cliente_id: 2,
      produtos: [
        {
          id: 1, // ID do produto criado
          descricao: "Tinta branca",
          servico: "Pintura",
          quantidade: 5,
          categoria: "Material",
          status: "Disponível",
        },
      ],
    };
    (prisma.orcamento.create as jest.Mock).mockResolvedValue(orcamentoMock);

    // 2. Simule a criação do Pedido
    const pedidoMock = {
      id: 1,
      numero: "PED-123456789",
      status: "Pendente",
      orcamento_id: orcamentoMock.id,
      produtos: [
        {
          id: 1,
          produtoId: 1,
          status: "Pendente",
        },
      ],
    };
    (prisma.pedido.create as jest.Mock).mockResolvedValue(pedidoMock);

    // 3. Simule a criação da Ordem de Serviço
    const ordemServicoMock = {
      id: 1,
      descricao: "Ordem de Serviço para Pedido PED-123456789",
      numero_pedido: pedidoMock.id,
      produtos: [
        {
          id: 1,
          produtoId: 1,
          status: "Pendente",
        },
      ],
    };
    (prisma.ordemServico.create as jest.Mock).mockResolvedValue(ordemServicoMock);

    // 4. Configure o findUnique para retornar a ordem de serviço mockada
    (prisma.ordemServico.findUnique as jest.Mock).mockResolvedValue(ordemServicoMock);

    // 5. Configure a atualização do status do produto
    (prisma.pedidoProduto.update as jest.Mock).mockResolvedValue({
      id: 1,
      status: "Em andamento",
    });

    // Se o fluxo de criação for necessário, você pode chamá-lo. Caso contrário, o importante é
    // que o findUnique retorne um objeto que contenha um array de produtos com o produto que queremos atualizar.
    // Aqui, simulamos diretamente a existência da ordem de serviço.
    const resultado = await OrdemServicoService.atualizarStatusProduto(
      ordemServicoMock.id, // 1
      1,                   // id do produto
      "Em andamento"       // novo status
    );

    // Verifica se o status foi atualizado corretamente
    expect(resultado.status).toBe("Em andamento");
    expect(prisma.pedidoProduto.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: "Em andamento" },
    });
  });
});
