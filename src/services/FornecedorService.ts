import { prisma } from "../config/database"; 

export class FornecedorService {
  static async criarFornecedor(nome: string, email: string | null, endereco: string | null, telefone: string, cnpj: string) {
    return await prisma.fornecedor.create({
      data: { nome, email, endereco, telefone, cnpj },
    });
  }

  static async listarFornecedores() {
    return await prisma.fornecedor.findMany({
      include: { materiais: true }, // Inclui os materiais fornecidos
    });
  }

  static async buscarFornecedorPorId(id: number) {
    return await prisma.fornecedor.findUnique({
      where: { id },
      include: { materiais: true },
    });
  }

  static async atualizarFornecedor(id: number, dados: Partial<{ nome: string; email: string | null; endereco: string | null; telefone: string; cnpj: string }>) {
    return await prisma.fornecedor.update({
      where: { id },
      data: dados,
    });
  }

  static async deletarFornecedor(id: number) {
    return await prisma.fornecedor.delete({ where: { id } });
  }
}
