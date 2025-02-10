/*
  Warnings:

  - You are about to drop the `Funcionario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Funcionario";

-- CreateTable
CREATE TABLE "funcionario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT,
    "endereco" TEXT,
    "telefone" TEXT,
    "cpf" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "funcionario_pkey" PRIMARY KEY ("id")
);
