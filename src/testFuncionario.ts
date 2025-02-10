import { prisma } from "./config/database";

async function criarFuncionario() {
  const funcionario = await prisma.funcionario.create({
    data: {
      nome: "João Silvaa",
      email: "joao.silvaa@email.com",
      endereco: "Rua das Floress, 123",
      telefone: "11999999998",
      cpf: "12345678922",
      senha: "senhaSegura321"
    }
  });
  console.log(funcionario);
}

criarFuncionario().catch((error) => {
  console.error("Erro ao criar funcionário:", error);
});
