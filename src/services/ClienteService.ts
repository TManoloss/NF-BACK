import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ClienteService {
  static async criarCliente(nome: string, email: string, telefone: string, endereco: string, cpf: string) {
    console.log(`Criando cliente: ${nome}, Email: ${email}, Telefone: ${telefone}, Endereço: ${endereco}, CPF: ${cpf}`);
    
    const clienteCriado = await prisma.cliente.create({
      data: { nome, email, telefone, endereco, cpf },
    });

    console.log(`Cliente criado com sucesso: ${clienteCriado.id}`);
    return clienteCriado;
  }

  static async listarClientes() {
    console.log('Listando todos os clientes...');
    
    const clientes = await prisma.cliente.findMany();
    console.log(`Total de clientes encontrados: ${clientes.length}`);
    
    return clientes;
  }

  static async buscarClientePorId(id: number | string) {
    console.log(`Buscando cliente com ID: ${id}...`);
    
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) }, // Convertendo para número
    });

    if (cliente) {
      console.log(`Cliente encontrado: ${cliente.id}`);
    } else {
      console.log(`Cliente com ID ${id} não encontrado.`);
    }

    return cliente;
  }

  static async buscarClientePorNome(nome: string) {
    console.log(`Buscando clientes pelo nome: ${nome}...`);
    
    const clientes = await prisma.cliente.findMany({
      where: {
        nome: {
          contains: nome, // Busca clientes cujo nome contenha a string fornecida
          mode: "insensitive", // Ignora maiúsculas/minúsculas
        },
      },
    });

    console.log(`Clientes encontrados com o nome "${nome}": ${clientes.length}`);
    return clientes;
  }

  static async deletarCliente(id: number | string) {
    console.log(`Deletando cliente com ID: ${id}...`);
    
    const clienteDeletado = await prisma.cliente.delete({
      where: { id: Number(id) }, // Convertendo para número
    });

    console.log(`Cliente com ID ${clienteDeletado.id} deletado com sucesso.`);
    return clienteDeletado;
  }
}
