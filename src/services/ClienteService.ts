import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ClienteService {
  static async criarCliente(nome: string, email: string, telefone: string, endereco: string, cpf : string) {
    return await prisma.cliente.create({
      data: { nome, email, telefone, endereco, cpf },
    });
  }

  static async listarClientes() {
    return await prisma.cliente.findMany();
  }

  static async buscarClientePorId(id: string) {
    return await prisma.cliente.findUnique({ where: { id } });
  }
  static async buscarClientePorNome(nome: string) {
    return await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nome, // Busca clientes cujo nome contenha a string fornecida
          mode: "insensitive", // Ignora maiúsculas/minúsculas
        },
      },
    });
  }
  
  
  static async deletarCliente(id: string) {
    return await prisma.cliente.delete({ where: { id } });
  }
}
