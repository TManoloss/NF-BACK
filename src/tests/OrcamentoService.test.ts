import { OrcamentoService } from "../services/OrcamentoService";
import { PrismaClient } from "@prisma/client";

// Mock do Prisma Client
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      orcamento: {
        create: jest.fn(),
      },
    })),
  };
});

const prisma = new PrismaClient();

describe("OrcamentoService", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Limpa os mocks após cada teste
  });

  describe("criarOrcamento", () => {
    it("deve lançar um erro se o orçamento não tiver produtos", async () => {
      // Dados do orçamento sem produtos
      const orcamentoSemProdutos = {
        descricao: "Orçamento de reforma",
        servico: "Pintura",
        quantidade: 10,
        data_vencimento: new Date("2025-03-01T00:00:00.000Z"),
        endereco: "Rua Exemplo, 123",
        cliente_id: 2,
        produtos: [], // Sem produtos
      };

      // Executa o método e espera um erro
      await expect(OrcamentoService.criarOrcamento(orcamentoSemProdutos)).rejects.toThrow(
        "O orçamento deve ter pelo menos um produto."
      );

      // Verifica se o método create do Prisma NÃO foi chamado
      expect(prisma.orcamento.create).not.toHaveBeenCalled();
    });
  });
});