import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthController {
  static async login(req: Request, res: Response): Promise<Response> {
    console.log("📩 Dados recebidos no backend:", req.body);
    const { email, senha } = req.body;

    try {
      const admin = await prisma.admin.findUnique({
        where: { email },
      });

      if (!admin || admin.senha !== senha) {
        console.log("Login falhou: credenciais inválidas");
        return res.status(400).json({ message: "Credenciais inválidas" });
      }

      console.log("Login realizado com sucesso para:", email);
      return res.status(200).json({ message: "Login realizado com sucesso" });
    } catch (error) {
      console.error("Erro no servidor:", error);
      return res.status(500).json({ message: "Erro no servidor" });
    }
  }
}
