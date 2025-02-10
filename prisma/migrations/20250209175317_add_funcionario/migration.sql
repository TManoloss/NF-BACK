/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Funcionario` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Funcionario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Funcionario_cpf_key";

-- DropIndex
DROP INDEX "Funcionario_email_key";

-- AlterTable
ALTER TABLE "Funcionario" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
