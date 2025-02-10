import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("senhaSegura123", 10);
  // Criar Admin
  const admin = await prisma.admin.create({
    data: {
      nome: "Admin Master",
      email: "admin@email.com",
      senha: "senhaSegura123",
    },
  });
  console.log("Admin Criado!");
  //   const funcionario = await prisma.funcionario.create({
  //     data: {
  //       nome: "Irmão Jó",
  //       email: "exemplo@exemplo.com",
  //       telefone: "999999999",
  //       cpf: "12345678910",
  //     },
  //   });
  //   console.log({ admin, funcionario });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
