import { prisma } from '../config/database';
import bcrypt from 'bcrypt';

export class FuncionarioService {
  static async criarFuncionario(
    nome: string,
    email: string | null,
    endereco: string | null,
    telefone: string | null,
    cpf: string,
    senha: string
  ) {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    return prisma.funcionario.create({
      data: {
        nome,
        email,
        endereco,
        telefone,
        cpf,
        senha: senhaCriptografada,
      },
    });
  }

  static async listarFuncionarios() {
    return prisma.funcionario.findMany();
  }
}
