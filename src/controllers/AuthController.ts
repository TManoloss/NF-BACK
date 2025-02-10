import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";


const prisma = new PrismaClient();

export class AuthController {
  static async login(req: Request, res: Response): Promise<Response> {
    console.log("📩 Dados recebidos no backend:", req.body);
    const { email, senha } = req.body;

    try {
      // Verifica se o usuário é um administrador
      const admin = await prisma.admin.findUnique({
        where: { email },
      });

      if (admin && admin.senha === senha) {
        console.log("Login realizado com sucesso para admin:", email);
        return res.status(200).json({ message: "Login realizado com sucesso" });
      }

      // Verifica se o usuário é um funcionário
      const funcionario = await prisma.funcionario.findUnique({
        where: { email },
      });

      if (funcionario && (await bcrypt.compare(senha, funcionario.senha))) {
        console.log("Login realizado com sucesso para funcionário:", email);
        return res.status(200).json({ message: "Login realizado com sucesso" });
      }
      

      console.log("Login falhou: credenciais inválidas");
      return res.status(400).json({ message: "Credenciais inválidas" });
    } catch (error) {
      console.error("Erro no servidor:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }
}
