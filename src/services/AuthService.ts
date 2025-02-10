import { prisma } from "../config/database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Admin } from "../models/Admin";

export class AuthService {
  static async login(email: string, senha: string): Promise<string | null> {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin || !(await bcrypt.compare(senha, admin.senha))) {
      return null;
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      },
    );
    return token;
  }
}
