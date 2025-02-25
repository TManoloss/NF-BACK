import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MaterialService {
  static async criarMaterial(descricao: string, produtoId: number, fornecedorId: number) {
    return await prisma.material.create({
      data: {
        descricao,
        fornecedor_id: fornecedorId,
        MaterialProduto: {
          create: {
            produtoId,
            quantidade: 1, // Defina a quantidade inicial
          },
        },
      },
      include: { fornecedor: true, MaterialProduto: { include: { produto: true } } },
    });
  }

  static async listarMateriais() {
    return await prisma.material.findMany({
      include: { fornecedor: true, MaterialProduto: { include: { produto: true } } },
    });
  }

  static async buscarMaterialPorId(id: number) {
    return await prisma.material.findUnique({
      where: { id },
      include: { fornecedor: true, MaterialProduto: { include: { produto: true } } },
    });
  }

  static async atualizarMaterial(id: number, dados: Partial<{ descricao: string; fornecedorId: number }>) {
    return await prisma.material.update({
      where: { id },
      data: {
        descricao: dados.descricao,
        fornecedor_id: dados.fornecedorId,
      },
      include: { fornecedor: true, MaterialProduto: { include: { produto: true } } },
    });
  }

  static async deletarMaterial(id: number) {
    return await prisma.material.delete({ where: { id } });
  }
}
